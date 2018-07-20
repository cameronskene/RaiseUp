import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class MaterialModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modal,
      data: this.props.data,
    };

    this.toggle = this.toggle.bind(this);
  }
  componentWillReceiveProps(newProps) {
    this.setState({modal: newProps.modal})
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    console.log("I'm a modal! ", this.state.modal)
    return (
      <div className="MaterialModal">
        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.state.data.title}</ModalHeader>
          <ModalBody>
            <img src={this.state.data.pictureUrl} className="modal-image" />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Back</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default MaterialModal;