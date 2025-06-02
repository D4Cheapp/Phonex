import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';

interface Props {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, description }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <p className="text-xl font-semibold">{title ? title : 'Подтверждение'}</p>
        </ModalHeader>
        <ModalBody>
          <p>{description ? description : 'Вы уверены что хотите совершить это действие?'}</p>
        </ModalBody>
        <ModalFooter className="flex justify-center gap-5">
          <Button className="w-1/2" color="danger" onPress={onConfirm}>
            Да
          </Button>
          <Button className="w-1/2" color="primary" onPress={onClose}>
            Отменить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
