import React, { Component, Fragment, useEffect, useState } from "react";
import { Card, Image, Button, Col, Container, Row } from "react-bootstrap";
import { BASE_URL } from "../../utils";

const DroppedImage = ({ idAdjunto, file, removeImage }) => {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    if (isNaN(idAdjunto)) {
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSrc(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setSrc(`${BASE_URL}/adjuntos/${idAdjunto}`);
      }
    }
  }, []);

  return (
    <>
      <Card
        style={{
          backgroundColor: "transparent",
          border: 0,
          height: 100,
          width: 100,
        }}
        className="mb-4"
      >
        {src !== null && (
          <Image
            src={src}
            className="mr-3 imagen-dropzone"
            style={{ height: 100, width: "auto", objectFit: "contain" }}
          />
        )}
      </Card>
      <Button
        variant="outline-danger"
        style={{ position: "absolute", top: 0, left: "90%" }}
        onClick={() => removeImage(idAdjunto)}
      >
        <i className="fa fa-trash" />
      </Button>
    </>
  );
};

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: props.file,
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleModifier = this.handleModifier.bind(this);
  }

  componentDidMount() {
    this.setDropZone();
    this.setImage({});
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.idAdjunto &&
      prevProps.idAdjunto !== null &&
      (!this.props.idAdjunto || this.props.idAdjunto === null)
    ) {
      this.setDropZone();
    }
    if (
      prevProps.file &&
      prevProps.file !== null &&
      (!this.props.file || this.props.file === null || !this.props.file.name)
    ) {
      this.setDropZone();
    }
    if (prevProps.file && this.props.file) {
      if (
        prevProps.file.name !== this.props.file.name &&
        this.props.file.name
      ) {
        this.setFile(this.props.file);
      }
    } else {
      document.getElementById("fileInput").value = null;
    }
    this.setImage(prevProps);
  }

  setImage(prevProps) {
    if (
      this.props.idAdjunto &&
      this.props.idAdjunto !== null &&
      !isNaN(this.props.idAdjunto) &&
      this.props.idAdjunto !== prevProps.idAdjunto
    ) {
      let src = `${this.props.base_url}${this.props.idAdjunto}`;
      this.setState({ src });
    } else if (this.props.idAdjunto !== prevProps.idAdjunto) {
      this.setState({ src: undefined });
    }
    if (prevProps.file && !this.props.file) {
      if (!this.props.idAdjunto || this.props.idAdjunto == null) {
        this.handleModifier();
        this.setState({ src: undefined });
      }
    }
  }

  setFile(file) {
    let reader = new FileReader();
    reader.onload = (e) => {
      let src = e.target.result;
      this.setState({ src, height: 150 });
    };
    reader.readAsDataURL(file);
  }

  setDropZone() {
    let area = document.getElementById("drop-area");
    if (area !== null) {
      ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
        area.addEventListener(eventName, this.preventDefaults, false);
      });
      area.addEventListener("drop", this.handleDrop, false);
    }
  }

  preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDrop(e) {
    let files = e.dataTransfer.files;
    this.handleSelect({ target: { files } });
  }

  handleSelect(evt) {
    if (this.props.multiple) {
      return this.handleFiles(evt.target.files);
    }
    let file = evt.target.files[0];
    if (file) {
      if (!String(file.type).includes("image")) {
        return this.props.alert("El archivo debe ser una imagen");
      }
      this.setFile(file);
      this.handleModifier(file);
    }
  }

  handleFiles(files) {
    if (files) {
      if (Array.from(files).length > 30)
        return this.props.alert("Solo puedes subir hasta 30 fotografías.");
      for (let i = 0; i < files.length; i++) this.handleModifier(files[i]);
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

  renderImages() {
    if (this.state.src)
      return (
        <DroppedImage
          key={this.state.src}
          src={this.state.src}
          removeImage={this.props.removeImage}
        />
      );
    if (this.props.files && this.props.files !== null) {
      return this.props.files.map((file, index) => (
        <DroppedImage
          key={index}
          src={file}
          index={index}
          removeImage={(file) => this.props.removeImage(file)}
        />
      ));
    }
    return null;
  }

  changeImagen() {
    document.getElementById("fileInput").click();
  }

  renderDropZone() {
    if (!this.state.src) {
      return (
        <Container fluid className="px-0">
          <div
            id="drop-area"
            style={{
              height: this.props.height ? this.props.height : 160,
              width: "100%",
            }}
            className="bg-filosofia text-center pt-3 dashed-gray px-3"
          >
            <Row>
              <label htmlFor="fileInput" className="d-block text-center m-auto">
                {this.props.placeholder}
                <i className="fas fa-image fa-2x"></i>
                <p className="py-0 mb-0">Arrastra fotos desde tu computadora</p>
                <p className="py-0 mb-1">
                  Tamaño límite 2MB
                  {this.props.message ? this.props.message : ""}
                </p>
              </label>
            </Row>
            <Row>
              <Col xs={2}>
                <input
                  className="d-block text-center hidden"
                  type="file"
                  id="fileInput"
                  multiple={this.props.multiple}
                  accept="image/x-png,image/gif,image/jpeg,image/jpg"
                  onChange={this.handleSelect}
                />
              </Col>
              <Col xs={8}>
                <label
                  htmlFor="fileInput"
                  className="px-2"
                  style={{
                    border: "solid",
                    borderColor: "rgb(34, 37, 41)",
                    borderWidth: 1,
                  }}
                >
                  Escoger archivo
                </label>
              </Col>
              <Col xs={2} />
            </Row>
          </div>
        </Container>
      );
    } else {
      return (
        <Container fluid className="px-0">
          <Button
            variant="outline-secondary"
            className="border-red-new mt-4 pt-2"
            onClick={() => this.changeImagen()}
          >
            Cambiar Imagen
          </Button>
          <input
            className="d-block text-center hidden"
            type="file"
            id="fileInput"
            multiple={this.props.multiple}
            ref={"fileInputRef"}
            accept="image/x-png,image/gif,image/jpeg,image/jpg"
            onChange={this.handleSelect}
          />
        </Container>
      );
    }
  }

  render() {
    let images = this.renderImages();
    return (
      <Fragment>
        {images && images !== null && images.length > 0 && (
          <div
            style={{
              height: this.props.images ? 150 : 150,
              position: "relative",
            }}
          >
            {images}
          </div>
        )}
        {this.renderDropZone()}
      </Fragment>
    );
  }
}

export default Dropzone;
