void main() {
    // projectionMatrix -- mat4
    // * is equialent to dot product 
    // we need to do this to allow our 
    // custom position/texture rendering to take place 
    // to understand the conversion from 3D to 2D representation
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}