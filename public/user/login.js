'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var loginUser = function (_React$Component) {
  _inherits(loginUser, _React$Component);

  function loginUser(props) {
    _classCallCheck(this, loginUser);

    var _this = _possibleConstructorReturn(this, (loginUser.__proto__ || Object.getPrototypeOf(loginUser)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(loginUser, [{
    key: 'render',
    value: function render() {
      React.createElement(
        'div',
        null,
        ' Login User '
      );
    }
  }]);

  return loginUser;
}(React.Component);

var logUser = document.querySelector('#loginUserContainer');
ReactDOM.render(React.createElement('loginUser', null), logUser);