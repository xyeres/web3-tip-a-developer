import React, { useState } from "react";
// Modal
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

type Props = {}

const SimpleModal = (props: Props) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div>
      <button onClick={onOpenModal}>Open modal</button>
      <Modal open={open} onClose={onCloseModal} center>
        <h2>Simple centered modal</h2>
      </Modal>
    </div>
  );
}

export default SimpleModal