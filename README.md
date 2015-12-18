# Small Simple JavaScript Introduction
#### by kevin roark

## Server
In this demo, our server is made using node.js and Socket.IO. When a client (browser) requests a color, we generate a random color on the server and send it back to the client.

## Client
Our browser-based code has a simple purpose: show a button that says "change my color" that changes color every time it is pressed. The client is presented in various iterations here so you can see how to make specific changes, and how you might evolve a web page over time.

## Client Iterations
* v0 implements basic color changing via client-server interaction
* v1 adds a few css styles to the button so that it feels more like a button
* v2 introduces the tween.js animation library to add a physical effect when the button is pressed
* v3 introduces the tone.js audio library to play a nice synth sound when the button is pressed
* v4 introduces the three.js 3D library to add a 3D cube to a random part of the page when the button is pressed
* v5 exemplifies how to apply modules to different scenarios, by using tween.js to animate the size of the 3D cubes
