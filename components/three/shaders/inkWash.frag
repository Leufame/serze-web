// Sumi-e ink wash — fragment shader
// Inky black with soft edge dissolve, paper bleed

uniform float uTime;
uniform vec3 uInkColor;
uniform float uOpacity;
uniform float uBleed;

varying vec2 vUv;
varying float vNoise;

void main() {
  vec2 uv = vUv;

  float n = vNoise * 0.5 + 0.5;

  // Vertical fade — mountain top stays solid, base dissolves into paper
  float verticalFade = smoothstep(0.0, 0.6, uv.y);

  // Edge bleed — soft irregular dissolve
  float edge = 1.0 - smoothstep(0.0, uBleed, abs(uv.x - 0.5));
  edge = mix(0.3, 1.0, edge);

  // Subtle ink density variation
  float density = mix(0.85, 1.0, n);

  float alpha = verticalFade * edge * density * uOpacity;

  gl_FragColor = vec4(uInkColor, alpha);
}
