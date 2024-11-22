export const id: String = 'simpleshadereditor'
export const name: String = 'Simple ShaderEditor'

export const defaultFragmentShader: String = 
`varying highp vec2 v_texCoord;

uniform sampler2D u_drawTex;
uniform float color;

void main()
{
  gl_FragColor = texture2D(u_drawTex, v_texCoord);
  gl_FragColor.rgb = clamp(gl_FragColor.rgb / (gl_FragColor.a + 1e-3), 0.0, 1.0);
  gl_FragColor.rgb *= gl_FragColor.a;
}
`
export const defaultVertexShader: String = 
`attribute highp vec4 a_position;

varying highp vec2 v_texCoord;
attribute highp vec2 a_texCoord;

void main()
{
    gl_Position = a_position * vec4(a_position.w,a_position.w,0,1);
    v_texCoord = (a_position.xy / 2.0) + vec2(0.5,0.5);
}
`