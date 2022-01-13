import React, { Component } from "react";

class ImageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleModifier = this.handleModifier.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      let src = this.props.value;
      if (this.props.base_url) src = this.props.base_url + src;
      this.setState({ src });
    }
  }

  handleModifier(file) {
    if (this.props.modifier) {
      if (this.props.args) {
        if (Array.isArray(this.props.args))
          this.props.modifier(...this.props.args, file);
        else this.props.modifier(this.props.args, file);
      } else {
        this.props.modifier(file);
      }
    }
  }

  handleChange(evt) {
    let file = evt.target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      let src = e.target.result;
      this.setState({ src, height: 180 });
    };
    reader.readAsDataURL(file);
    this.handleModifier(file);
  }

  renderImagen() {
    if (this.state.src)
      return (
        <img
          className="d-block mb-3 w-100 mw-100"
          style={{ height: 200, objectFit: "cover" }}
          src={this.state.src}
          alt=""
        />
      );
  }

  renderLabel() {
    if (this.props.label) {
      return (
        <label className="d-block mb-3" htmlFor={this.props.name}>
          {this.props.label}
        </label>
      );
    }
  }

  render() {
    return (
      <div
        className="image-input-container"
        onClick={() => document.getElementById("fileInput").click()}
      >
        <div className="row align-items-center h-100">
          <div className="col col-md-2">
            <i className="fa fa-camera ms-2"></i>
          </div>
          <div className="col col-md-10 pt-1">
            <p className="small mt-2">Seleccionar Archivo</p>
          </div>
        </div>
        <div className="text-left w-100">{this.renderImagen()}</div>
        <div style={{ width: "100%" }}>
          {this.renderLabel()}
          <input id="fileInput" type="file" onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

export default ImageInput;
