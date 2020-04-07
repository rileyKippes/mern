'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginUser = function (_React$Component) {
	_inherits(LoginUser, _React$Component);

	function LoginUser(props) {
		_classCallCheck(this, LoginUser);

		var _this = _possibleConstructorReturn(this, (LoginUser.__proto__ || Object.getPrototypeOf(LoginUser)).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(LoginUser, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"form",
				{ id: "login_box", className: "vert_list", action: "login", method: "post" },
				React.createElement(
					"h3",
					null,
					" Please use a terrible login, anything should work! "
				),
				React.createElement(
					"label",
					null,
					"Username:"
				),
				React.createElement("input", { className: "login", id: "username", type: "text", name: "username" }),
				React.createElement(
					"label",
					null,
					"Password:"
				),
				React.createElement("input", { className: "login", id: "password", type: "password", name: "password" }),
				React.createElement("input", { type: "submit", value: "Log In" })
			);
		}
	}]);

	return LoginUser;
}(React.Component);

var logUser = document.querySelector('#loginUserContainer');
ReactDOM.render(React.createElement(LoginUser, null), logUser);