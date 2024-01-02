// Pass the uv & normal default passed properties to fragments.glsl (somewhat like React props)
varying vec3 vertexNormal;

void main() {
    // Instanciate the vertexUV & vectorNormal prop
    // vertexNormal = normal;
    vertexNormal = normalize(normalMatrix * normal);

    // projectionMatrix -- mat4
    // * is equialent to dot product 
    // we need to do this to allow our 
    // custom position/texture rendering to take place 
    // to understand the conversion from 3D to 2D representation
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}