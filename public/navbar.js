'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavBarClass = function (_React$Component) {
	_inherits(NavBarClass, _React$Component);

	function NavBarClass(props) {
		_classCallCheck(this, NavBarClass);

		var _this = _possibleConstructorReturn(this, (NavBarClass.__proto__ || Object.getPrototypeOf(NavBarClass)).call(this, props));

		_this.state = { loginBtnClicked: false,
			isLoggedIn: false };
		return _this;
	}

	_createClass(NavBarClass, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			if (this.state.isLoggedIn) {
				return React.createElement(
					"a",
					null,
					" Welcome User! "
				);
			}
			if (this.state.loginBtnClicked) {
				return React.createElement(
					"form",
					{ id: "login_box", "class": "vert_list", action: "/login", method: "post" },
					React.createElement(
						"p",
						null,
						" Please use a terrible login "
					),
					React.createElement(
						"p",
						null,
						" I am one man, and I am NOT touting myself a security expert. "
					),
					React.createElement(
						"div",
						null,
						React.createElement(
							"label",
							null,
							"Username:"
						),
						React.createElement("input", { id: "username", type: "text", name: "username" })
					),
					React.createElement(
						"div",
						null,
						React.createElement(
							"label",
							null,
							"Password:"
						),
						React.createElement("input", { id: "password", type: "password", name: "password" })
					),
					React.createElement("input", { type: "submit", value: "Log In" })
				);
			}

			return React.createElement(
				"button",
				{ onClick: function onClick() {
						return _this2.setState({ loginBtnClicked: true });
					} },
				"Login"
			);
		}
	}]);

	return NavBarClass;
}(React.Component);

var navbarDiv = document.querySelector('#navbar');
ReactDOM.render(React.createElement(NavBarClass, null), navbarDiv);