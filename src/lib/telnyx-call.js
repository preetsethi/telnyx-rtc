const EventEmitter = require('events');


export class TelnyxCall extends EventEmitter {

  constructor(UA, phoneNumber) {
    super();

    this._mute = false;

    inviteOptions = {
      media: {
        constraints: {
          audio: true,
          video: false
        },
        render: {}
      }
    };
    this._session = UA.invite(new SIP.URI("sip", phoneNumber, UA.host, UA.port).toString(), inviteOptions);
    // listen to SIP.js events, use our own
    // EventEmitter to emit custom events
    this._session.on("progress", (response) => this.emit("progress", response));
    this._session.on("accepted", (data) => this.emit("accepted", data));
    this._session.on("connecting", () => this.emit("connecting"));

    this._session.on("rejected", (response, cause) => this.emit("rejected", response, cause));
    this._session.on("failed", (response, cause) => this.emit("failed", response, cause));
    this._session.on("bye", (evt) => this.emit("bye", evt));
  }
  // accept() {}
  // reject() {}
  // ignore() {}

  disconnect() {}

  mute(isMute /*bool*/) {
    this._mute = isMute;
  }

  isMuted() {
    return this._mute;
  }

  sendDigits() {}
  status() {}
}
