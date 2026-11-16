import { useEffect, useRef } from 'react'

/* ============================================================
   Canvas 光场：移植自 Brallent_动态首页演示.html
   - 连续生成的有机光带，无图片、无固定几何
   - 鼠标移动 / 轻触产生形态响应（touch 不劫持滚动）
   - 支持暂停、离屏停止绘制、prefers-reduced-motion
   ============================================================ */

const DPR_CAP = 1.6

export function HeroArt({ paused }: { paused: boolean }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const st = useRef({
    time: 1.8,
    mouse: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
    burst: 0,
    w: 1,
    h: 1,
  })

  /* —— 绘制单帧 —— */
  useEffect(() => {
    const canvas = canvasRef.current
    const stage = stageRef.current
    if (!canvas || !stage) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let raf = 0
    let last = 0
    let frameTime = 0
    let inView = true
    let dpr = 1

    const resize = () => {
      const w = stage.clientWidth
      const h = stage.clientHeight
      st.current.w = w
      st.current.h = h
      dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
    }

    const draw = () => {
      const s = st.current
      const w = s.w
      const h = s.h
      if (!w || !h) return
      const c = ctx
      c.setTransform(dpr, 0, 0, dpr, 0, 0)
      c.clearRect(0, 0, w, h)

      const scale = w < 700 ? Math.max(0.7, Math.min(w / 1150, h / 365)) : Math.min(w / 1150, h / 365)
      const T = s.time * 0.17
      c.save()
      c.translate(w * 0.5 + s.mouse.x * 14, h * 0.54 + s.mouse.y * 8)
      c.scale(scale, scale)
      c.rotate(-0.055 + s.mouse.x * 0.025)

      for (let layer = 0; layer < 2; layer++) {
        const lines = w < 700 ? (layer ? 65 : 140) : layer ? 90 : 190
        const samples = w < 700 ? 150 : 200
        for (let j = 0; j < lines; j++) {
          const v = j / (lines - 1)
          const phase = layer * 0.7
          c.beginPath()
          for (let i = 0; i <= samples; i++) {
            const u = i / samples
            const env = Math.pow(Math.sin(Math.PI * u), 0.75)
            const wave = u * Math.PI * 2
            const fold = Math.sin(wave + 0.3 + T * 0.28 + phase)
            const width = (v - 0.5) * 238 * env * fold
            const x = (u - 0.5) * 1030 + Math.sin(v * 4 + u * 3.2 + T * 0.45) * 28 * env + (layer ? 24 : 0)
            const y =
              Math.sin(wave - 1.1 + T * 0.23) * 69 +
              Math.sin(wave * 1.8 + v * 1.4 - T * 0.25) * 26 +
              width +
              Math.cos(v * 3 + wave + T * 0.2) * 13 * env +
              (layer ? 19 : 0) +
              s.burst * Math.sin(u * 12 - T * 4) * 5 * env
            if (i === 0) c.moveTo(x, y)
            else c.lineTo(x, y)
          }
          const light = 67 + Math.sin(v * Math.PI) * 18
          const grad = c.createLinearGradient(-510, -60, 510, 60)
          grad.addColorStop(0, `hsla(199,88%,${light + 5}%,${layer ? 0.19 : 0.64})`)
          grad.addColorStop(0.28, `hsla(214,88%,${light - 14}%,${layer ? 0.25 : 0.82})`)
          grad.addColorStop(0.52, `hsla(216,90%,${light - 8}%,${layer ? 0.24 : 0.79})`)
          grad.addColorStop(0.75, `hsla(205,88%,${light + 1}%,${layer ? 0.2 : 0.66})`)
          grad.addColorStop(1, `hsla(201,86%,${light + 7}%,${layer ? 0.18 : 0.56})`)
          c.strokeStyle = grad
          c.lineWidth = layer ? 0.85 : 1.12
          c.stroke()
        }
      }
      c.restore()
    }

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000 || 0, 0.05)
      last = now
      const active = !paused && !document.hidden && !reduce.matches
      if (active) {
        st.current.time += dt
        st.current.burst *= Math.pow(0.16, dt)
        st.current.mouse.x += (st.current.target.x - st.current.mouse.x) * 0.035
        st.current.mouse.y += (st.current.target.y - st.current.mouse.y) * 0.035
      }
      const interval = st.current.w < 700 ? 1000 / 24 : 1000 / 30
      if (now - frameTime > interval) {
        if (inView) draw()
        frameTime = now
      }
      raf = requestAnimationFrame(loop)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || reduce.matches || paused) return
      const r = stage.getBoundingClientRect()
      st.current.target.x = ((e.clientX - r.left) / r.width) * 2 - 1
      st.current.target.y = ((e.clientY - r.top) / r.height) * 2 - 1
    }
    const onPointerLeave = () => {
      st.current.target.x = 0
      st.current.target.y = 0
    }
    const onPointerDown = (e: PointerEvent) => {
      if (reduce.matches || paused) return
      st.current.burst = 1
      const r = stage.getBoundingClientRect()
      st.current.target.x = ((e.clientX - r.left) / r.width) * 2 - 1
      st.current.target.y = ((e.clientY - r.top) / r.height) * 2 - 1
    }

    const ro = new ResizeObserver(() => {
      resize()
      draw()
    })
    ro.observe(stage)

    const io = new IntersectionObserver(
      (es) => {
        inView = es[0].isIntersecting
      },
      { threshold: 0 },
    )
    io.observe(stage)

    stage.addEventListener('pointermove', onPointerMove)
    stage.addEventListener('pointerleave', onPointerLeave)
    stage.addEventListener('pointerdown', onPointerDown)

    resize()
    draw()
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      stage.removeEventListener('pointermove', onPointerMove)
      stage.removeEventListener('pointerleave', onPointerLeave)
      stage.removeEventListener('pointerdown', onPointerDown)
    }
  }, [paused])

  return (
    <div className="art-stage" ref={stageRef} role="img" aria-label="持续舒展的冰蓝与品牌蓝流动曲面，随鼠标或轻触柔和变化">
      <canvas className="hero-canvas" ref={canvasRef} aria-hidden="true" />
      <span className="canvas-note" aria-hidden="true">
        移动鼠标，感受变化
      </span>
    </div>
  )
}

/* ============================================================
   业务卡的细密场线
   ============================================================ */
export function ServiceField({ type }: { type: 'digital' | 'fabric' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const time = useRef(0.6)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let raf = 0
    let visible = false
    let w = 1
    let h = 1
    let dpr = 1
    let last = 0
    let frameTime = 0

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      if (!w || !h) return
      const t = time.current
      ctx.clearRect(0, 0, w, h)
      if (type === 'digital') {
        for (let j = 0; j < 52; j++) {
          const v = j / 51
          ctx.beginPath()
          for (let x = -10; x <= w + 10; x += 5) {
            const a = x / w
            const y =
              h * 0.56 +
              (v - 0.5) * h * 0.67 +
              Math.sin(a * 5.1 + t * 0.23 + v * 0.75) * h * 0.14 * Math.sin(Math.PI * v) +
              Math.sin(a * 8.1 - t * 0.15) * h * 0.04
            if (x === -10) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.strokeStyle = `rgba(${Math.round(35 + v * 36)},${Math.round(120 + v * 42)},${Math.round(
            222 + v * 25,
          )},${0.08 + 0.33 * Math.sin(v * Math.PI)})`
          ctx.lineWidth = 1.1
          ctx.stroke()
        }
      } else {
        for (let j = 0; j < 125; j++) {
          const y0 = (j / 124) * h
          ctx.beginPath()
          for (let x = -5; x <= w + 5; x += 8) {
            const yy = y0 + 12 * Math.sin((x / w) * 4 + (y0 / h) * 2.2 + t * 0.07) + 5 * Math.sin((x / w) * 8 - (y0 / h) * 2)
            if (x === -5) ctx.moveTo(x, yy)
            else ctx.lineTo(x, yy)
          }
          ctx.strokeStyle = j % 3 === 0 ? 'rgba(255,255,255,.4)' : 'rgba(82,129,168,.13)'
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }
    }

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000 || 0, 0.05)
      last = now
      const active = visible && !document.hidden && !reduce.matches
      if (active) time.current += dt
      if (now - frameTime > 1000 / 20) {
        if (visible) draw()
        frameTime = now
      }
      raf = requestAnimationFrame(loop)
    }

    const ro = new ResizeObserver(() => {
      resize()
      draw()
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(
      (es) => {
        visible = es[0].isIntersecting
        if (visible) draw()
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    resize()
    draw()
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [type])

  return <canvas className="service-field" ref={canvasRef} aria-hidden="true" />
}
