import React from 'react';
import { CreateHabitModal } from './CreateHabitModal';
import { AddGroupModal } from './AddGroupModal';

interface ModalManagerProps {
  // Состояние модальных окон
  showAddModal: boolean;
  showEditModal: boolean;
  showAddGroupModal: boolean;
  
  // Обработчики закрытия
  onCloseAddModal: () => void;
  onCloseEditModal: () => void;
  onCloseAddGroupModal: () => void;
  
  // Обработчики сохранения
  onSaveHabit: (habitData: any) => void;
  onSaveEditHabit: (habitData: any) => void;
  onSaveGroup: (groupData: any) => void;
  
  // Данные
  groups: any[];
  selectedHabit: any;
}

export const ModalManager: React.FC<ModalManagerProps> = ({
  showAddModal,
  showEditModal,
  showAddGroupModal,
  onCloseAddModal,
  onCloseEditModal,
  onCloseAddGroupModal,
  onSaveHabit,
  onSaveEditHabit,
  onSaveGroup,
  groups,
  selectedHabit,
}) => {
  return (
    <>
      {/* Модальное окно добавления привычки */}
      <CreateHabitModal
        visible={showAddModal}
        onClose={onCloseAddModal}
        onSave={onSaveHabit}
        groups={groups}
      />

      {/* Модальное окно редактирования привычки */}
      <CreateHabitModal
        visible={showEditModal}
        onClose={onCloseEditModal}
        onSave={onSaveEditHabit}
        groups={groups}
        editMode={true}
        habitData={selectedHabit}
      />

      {/* Модальное окно добавления группы */}
      <AddGroupModal
        visible={showAddGroupModal}
        onClose={onCloseAddGroupModal}
        onSave={onSaveGroup}
      />
    </>
  );
};
