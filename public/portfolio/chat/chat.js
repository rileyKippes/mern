var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chat = function (_React$Component) {
	_inherits(Chat, _React$Component);

	function Chat(props) {
		_classCallCheck(this, Chat);

		console.log("constructor");

		var _this = _possibleConstructorReturn(this, (Chat.__proto__ || Object.getPrototypeOf(Chat)).call(this, props));

		_this.state = { paused: false,
			ready: false,
			i: 0,
			data: { key: 'value' },
			color: false };
		_this.colors = ["#ff0000", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"];
		_this.getAPI();
		return _this;
	}

	_createClass(Chat, [{
		key: "getAPI",
		value: function getAPI() {
			var _this2 = this;

			if (this.state.paused) {
				return;
			}
			console.log("getAPI();\n i=" + this.state.i);
			this.state.i++;
			fetch('/p/chat/api').then(function (response) {
				return response.json();
			}).then(function (myJson) {
				_this2.setState({ ready: true, data: myJson });
			});
		}
	}, {
		key: "postChat",
		value: function postChat() {
			var _this3 = this;

			//todo: actually post comments
			console.log("postChat()");
			var form = new FormData(document.getElementById("comment_box"));
			fetch('/p/chat/api', {
				method: 'POST',
				body: form }).then(function (response) {
				return response.json();
			}).then(function (myJson) {
				_this3.setState({ ready: true, data: myJson });
			});
		}
	}, {
		key: "pauseChat",
		value: function pauseChat() {
			console.log("pauseChat()");
			this.setState({ paused: !this.state.paused });
		}
	}, {
		key: "setColor",
		value: function setColor() {
			console.log('setColor()');
			var pick = Math.floor(Math.random() * this.colors.length);
			var color = this.colors[pick];
			document.cookie = "color=" + color + ";sameSite=strict";
			//document.getElementById("color_container").style.color = color;
			this.state.color = color;
		}
	}, {
		key: "getColor",
		value: function getColor() {
			console.log('getColor()');
			console.log(document.cookie);
			return document.cookie;
		}
	}, {
		key: "render",
		value: function render() {

			setTimeout(this.getAPI.bind(this), 1500);

			if (!this.state.color) {
				this.getColor();
			}

			if (this.state.ready) {
				var chat = [];
				console.log(this.state.data);
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.state.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var data = _step.value;

						var currStyle = {
							borderColor: data.cookie
						};
						chat.push(React.createElement(
							"div",
							{ className: "comment",
								key: data._id,
								style: currStyle },
							data.comment
						));
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				return React.createElement(
					"div",
					{ id: "chat_div" },
					React.createElement(
						"form",
						{ id: "comment_box" },
						React.createElement("input", { id: "comment_input",
							type: "text",
							placeholder: "chat",
							name: "comment" }),
						React.createElement("input", { id: "post_chat_btn",
							type: "button",
							value: " > ",
							onClick: this.postChat.bind(this) })
					),
					React.createElement(
						"div",
						{ id: "chat_box" },
						chat
					),
					React.createElement(
						"div",
						{ id: "debug_buttons" },
						React.createElement(
							"button",
							{ onClick: this.pauseChat.bind(this) },
							this.state.paused ? "Unpause" : "Pause",
							" Chat"
						),
						React.createElement(
							"button",
							{ onClick: this.setColor.bind(this) },
							"Reset color"
						)
					)
				);
			}
			return React.createElement(
				"div",
				{ id: "chat_div" },
				"Loading. . ."
			);
		}
	}]);

	return Chat;
}(React.Component);

var ChatDomContainer = document.querySelector('#chat_container');
ReactDOM.render(React.createElement(Chat, null), ChatDomContainer);