$(document).ready(() => {
	$(".preloader").remove()
	$(".working").show()
})

$('.miller').submit(function(events) {
	events.preventDefault()
})

const rads = angle => angle * (Math.PI / 180)
const degs = angle => angle * (180 / Math.PI)
window.requestAnimFrame = (() => window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || (callback => window.setTimeout(callback, 1000 / 60)))()

function draw_plane() {
	cleaner()
	// var x = document.getElementById("x").value || 1
	// var y = document.getElementById("y").value || 2
	// var z = document.getElementById("z").value || 3
	var x = 1
	var y = 2
	var z = 3

	var absx = Math.abs(x)
	var absy = Math.abs(y)
	var absz = Math.abs(z)
	var imax = Math.max(absx, absy, absz)
	var px = x/imax, py = y/imax, pz = z/imax
	var three = THREE
	var scene = new three.Scene()
	var camera = new three.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 1000)
	var renderer = new three.WebGLRenderer()
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.getElementById("r-canvas").appendChild(renderer.domElement)
	camera.position.set(4,4,4)
	camera.lookAt(scene.position)
	var axis = new three.AxisHelper(2.5)
	scene.add(axis)
	var cubeMaterial = new three.LineBasicMaterial({ color: 0xffffff })
	var cube = new three.EdgesGeometry(new three.BoxGeometry(1,1,1))
	var cuber = new three.LineSegments(cube, cubeMaterial)
	scene.add(cuber)

	if((x>0) && (y>0) && (z>0)) {
		cuber.position.set(0.5,0.5,0.5)
	} else if((x<0) && (y<0) && (z<0)) {
		cuber.position.set(-0.5,-0.5,-0.5)
	} else if((x>0) && (y<0) && (z<0)) {
		cuber.position.set(0.5,-0.5,-0.5)
	} else if((x<0) && (y>0) && (z<0)) {
		cuber.position.set(-0.5,0.5,-0.5)
	} else if((x<0) && (y<0) && (z>0)) {
		cuber.position.set(-0.5,-0.5,0.5)
	} else if((x>0) && (y>0) && (z<0)) {
		cuber.position.set(0.5,0.5,-0.5)
	} else if((x<0) && (y>0) && (z>0)) {
		cuber.position.set(-0.5,0.5,0.5)
	} else {
		cuber.position.set(0.5,-0.5,0.5)
	}

	var pointMaterial = new three.LineBasicMaterial({ color: 0xf0ff00 })
	var points = new three.Geometry()
	points.vertices.push(new three.Vector3(px,0,0))
	points.vertices.push(new three.Vector3(0,py,0))
	points.vertices.push(new three.Vector3(0,0,pz))
	points.vertices.push(new three.Vector3(px,0,0))
	var line = new three.Line(points, pointMaterial)
	scene.add(line)
	
	/* Geometry End */

	/* rotation start */
	var dragstatus = false
	var oldmouseposition = {
		x: 0,
		y: 0
	}

	$(renderer.domElement).on('mousedown', function(e) {
		dragstatus = true
	})
	.on('mousemove', function(e) {
		var move = {
			x: e.offsetX-oldmouseposition.x,
			y: e.offsetY-oldmouseposition.y
		}
		if(dragstatus) {   
			var deltaRotationQuaternion = new three.Quaternion().setFromEuler(new three.Euler(rads(move.y * 1),rads(move.x * 1),0,'XYZ'))
			scene.quaternion.multiplyQuaternions(deltaRotationQuaternion, scene.quaternion)
		}
		oldmouseposition = {
			x: e.offsetX,
			y: e.offsetY
		}
	})
	
	

	// $(document).on('mouseup', function(e) {
	// 	dragstatus = false
	// })
	document.addEventListener('mouseup', function(e) {
		dragstatus = false
	})

	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60)
		}
	})()

	var lastFrameTime = new Date().getTime() / 1000
	var totalTime = 0
	function update(dt, t) {
		setTimeout(function() {
			var currTime = new Date().getTime() / 1000
			var dt = currTime - (lastFrameTime || currTime)
			totalTime += dt          
			update(dt, totalTime)      
			lastFrameTime = currTime
		}, 0)
	}

	/* rotation end */

	function render() {
		renderer.render(scene, camera)
		requestAnimFrame(render)
	}
	render()
	update(0, totalTime)
}

function draw_dir() {
	cleaner()
	var x = document.getElementById("x").value
	var y = document.getElementById("y").value
	var z = document.getElementById("z").value
	var absx = Math.abs(x)
	var absy = Math.abs(y)
	var absz = Math.abs(z)
	var imax = Math.max(absx, absy, absz)
	var px = x/imax, py = y/imax, pz = z/imax
	var three = THREE
	var scene = new three.Scene()
	var camera = new three.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 1000)
	var renderer = new three.WebGLRenderer()
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.getElementById("r-canvas").appendChild(renderer.domElement)
	camera.position.set(4,4,4)
	camera.lookAt(scene.position)
	var axis = new three.AxisHelper(2.5)
	scene.add(axis)
	var cubeMaterial = new three.LineBasicMaterial({ color: 0xffffff, linewidth: 4 })
	var cube = new three.EdgesGeometry(new three.BoxGeometry(1,1,1))
	var cuber = new three.LineSegments(cube, cubeMaterial)
	scene.add(cuber)

	if((x>0) && (y>0) && (z>0)) {
		cuber.position.set(0.5,0.5,0.5)
	} else if((x<0) && (y<0) && (z<0)) {
		cuber.position.set(-0.5,-0.5,-0.5)
	} else if((x>0) && (y<0) && (z<0)) {
		cuber.position.set(0.5,-0.5,-0.5)
	} else if((x<0) && (y>0) && (z<0)) {
		cuber.position.set(-0.5,0.5,-0.5)
	} else if((x<0) && (y<0) && (z>0)) {
		cuber.position.set(-0.5,-0.5,0.5)
	} else if((x>0) && (y>0) && (z<0)) {
		cuber.position.set(0.5,0.5,-0.5)
	} else if((x<0) && (y>0) && (z>0)) {
		cuber.position.set(-0.5,0.5,0.5)
	} else {
		cuber.position.set(0.5,-0.5,0.5)
	}

	var pointMaterial = new three.LineBasicMaterial({ color: 0xf0ff00 })
	var points = new three.Geometry()
	points.vertices.push(new three.Vector3(0,0,0))
	points.vertices.push(new three.Vector3(px,py,pz))
	var line = new three.Line(points, pointMaterial)
	scene.add(line)

	
	/* Geometry End */

	/* rotation start */
	var dragstatus = false
	var oldmouseposition = {
		x: 0,
		y: 0
	}
	$(renderer.domElement).on('mousedown', function(e) {
		dragstatus = true
	})
	.on('mousemove', function(e) {
		var move = {
			x: e.offsetX-oldmouseposition.x,
			y: e.offsetY-oldmouseposition.y
		}
		if(dragstatus) {   
			var deltaRotationQuaternion = new three.Quaternion().setFromEuler(new three.Euler(rads(move.y * 1),rads(move.x * 1),0,'XYZ'))
			scene.quaternion.multiplyQuaternions(deltaRotationQuaternion, scene.quaternion)
		}
		oldmouseposition = {
			x: e.offsetX,
			y: e.offsetY
		}
	})

	$(document).on('mouseup', function(e) {
		dragstatus = false
	})

	var lastFrameTime = new Date().getTime() / 1000
	var totalTime = 0
	function update(dt, t) {
		setTimeout(function() {
			var currTime = new Date().getTime() / 1000
			var dt = currTime - (lastFrameTime || currTime)
			totalTime += dt          
			update(dt, totalTime)      
			lastFrameTime = currTime
		}, 0)
	}

	/* rotation end */

	function render() {
		renderer.render(scene, camera)
		requestAnimFrame(render)
	}
	render()
	update(0, totalTime)
}

function cleaner() {
	if(document.getElementById("r-canvas").hasChildNodes("canvas")) {
		$("canvas").remove()
	}
}

