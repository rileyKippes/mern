'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RegisterUserClass = function (_React$Component) {
	_inherits(RegisterUserClass, _React$Component);

	function RegisterUserClass(props) {
		_classCallCheck(this, RegisterUserClass);

		var _this = _possibleConstructorReturn(this, (RegisterUserClass.__proto__ || Object.getPrototypeOf(RegisterUserClass)).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(RegisterUserClass, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"form",
				{ className: "vert_list", action: "/u/register", method: "post" },
				React.createElement(
					"p",
					{ className: "list_item" },
					" Please use a terrible login "
				),
				React.createElement(
					"p",
					{ className: "list_item" },
					" I am one man, and I am NOT touting myself a security expert. "
				),
				React.createElement(
					"div",
					{ className: "list_item" },
					React.createElement(
						"label",
						null,
						"Username:"
					),
					React.createElement("input", { id: "username", type: "text", name: "username", required: true })
				),
				React.createElement(
					"div",
					{ className: "list_item" },
					React.createElement(
						"label",
						null,
						"Password:"
					),
					React.createElement("input", { id: "password", type: "password", name: "password", required: true })
				),
				React.createElement(
					"div",
					{ className: "list_item" },
					React.createElement(
						"label",
						null,
						"Confirm Password:"
					),
					React.createElement("input", { id: "password", type: "password", name: "confirm_password", required: true })
				),
				React.createElement(
					"div",
					{ className: "list_item" },
					React.createElement("input", { className: "list_item",
						type: "submit",
						value: "Register" })
				)
			);
		}
	}]);

	return RegisterUserClass;
}(React.Component);

var regUser = document.querySelector('#regUserContainer');
ReactDOM.render(React.createElement(RegisterUserClass, null), regUser);