'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.3 + uScroll * 0.5;

    vec2 mouse = uMouse * 0.3;
    float mouseDist = length(uv - 0.5 - mouse * 0.5);
    float mouseInfluence = smoothstep(0.4, 0.0, mouseDist) * 0.15;

    float n1 = snoise(vec3(uv * 2.5 + mouse * 0.2, t));
    float n2 = snoise(vec3(uv * 4.0 - mouse * 0.1, t * 1.3 + 1.5));
    float n3 = snoise(vec3(uv * 1.5 + mouse * 0.15, t * 0.7 + 3.0));

    float noise = n1 * 0.5 + n2 * 0.3 + n3 * 0.2 + mouseInfluence;

    vec3 cream1 = vec3(0.980, 0.973, 0.957);
    vec3 cream2 = vec3(0.941, 0.929, 0.906);
    vec3 gold = vec3(0.788, 0.663, 0.431);
    vec3 warm = vec3(0.957, 0.937, 0.886);

    float band1 = smoothstep(-0.3, 0.3, noise);
    float band2 = smoothstep(0.1, 0.7, noise + 0.2);

    vec3 color = mix(cream1, cream2, band1);
    color = mix(color, warm, band2 * 0.6);
    color = mix(color, gold, smoothstep(0.4, 0.8, noise) * 0.25);

    float vignette = 1.0 - length(uv - 0.5) * 0.8;
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`

export function LiquidHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetMouseRef = useRef({ x: 0, y: 0 })
  const scrollProgressRef = useRef(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    camera.position.z = 1

    const scene = new THREE.Scene()

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(canvas.offsetWidth, canvas.offsetHeight) },
      },
    })

    scene.add(new THREE.Mesh(geometry, material))

    const resize = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      renderer.setSize(w, h, false)
      material.uniforms.uResolution.value.set(w, h)
    }
    resize()

    let start = performance.now()
    let animId: number

    const tick = () => {
      animId = requestAnimationFrame(tick)
      const t = (performance.now() - start) * 0.001

      if (!prefersReduced) {
        mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05
        mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05
        material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y)
        material.uniforms.uTime.value = t
        material.uniforms.uScroll.value = scrollProgressRef.current
      }

      renderer.render(scene, camera)
    }
    tick()

    const handleResize = () => {
      resize()
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)

    const handleMouse = (e: MouseEvent) => {
      targetMouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      targetMouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', handleMouse)

    const st = ScrollTrigger.create({
      start: 'top top',
      end: '+=150%',
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress
      },
    })

    return () => {
      cancelAnimationFrame(animId)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouse)
      st.kill()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ willChange: 'transform' }}
    />
  )
}
