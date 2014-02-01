function at (t, v) {
	return {
			"t": t,
			"v": v
	};
}

I = {
	"time": 0,

    "data": function () {
		return [
			new I.Element.SimpleBox({
					"x": new I.li(0,0.5,30,0),
					"y": new I.li(0,0.5,0,70),
					"w": new I.li(0,0.5,0,100),
					"h": new I.li(0,0.5,0,30)
				},"rgba(128,128,0,0.5)"),
			new I.Element.SimpleBox({
					"x": new I.li(0,1,50,2),
					"y": new I.li(0,1,50,2),
					"w": new I.li(0,1,0,20),
					"h": new I.li(0,1,0,20)
				},"red"),
		];
	},

	"init": function () {
		I.data = I.data();

		var e;
		for (e in I.data) {
			I.data[e].init();
			// Execute at 60 fps
			setInterval (I.update, 1/60*1000);
		}
    },

    //! Begin a transition
    "begin": function () {
    	I.time = 0;
    },

    "update": function () {
 		I.time += 1/60;

		var e;
		for (e in I.data) {
			I.data[e].update();
		}
    },

    "Element": {
		"SimpleBox": function () {
			this.jDiv  = false;
			this.props = false;

			this.init = function () {
				this.props = this.args[0];

				this.jDiv = $("<div class='element'/>");
				this.update();
				this.jDiv.css("background", this.args[1]);

				$("body").append(this.jDiv);
			}

			this.update = function () {
				this.jDiv.css("width", this.props.w.v()+"%");
				this.jDiv.css("height", this.props.h.v()+"%");
				this.jDiv.css("left", this.props.x.v()+"%");
				this.jDiv.css("top", this.props.y.v()+"%");				
			}

			//@construct
			this.args = arguments;
		}
    },

    "Interpolator": {
    	"Linear": function (x0, x1, y0, y1) {
    		this.x0 = x0;
    		this.x1 = x1;
    		this.y0 = y0;
    		this.y1 = y1;

    		this.v = function (x) {
    			if (!x)
    				x = I.time;
    			if (x < this.x0)
    				return y0;
    			if (x > this.x1)
    				return y1;

    			return this.y0+(this.y1-this.y0)*(x-this.x0)/(this.x1-this.x0);
    		}
    	}
    }
};

I.li = I.Interpolator.Linear;