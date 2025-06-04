import { HolderOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import React, { ReactNode } from 'react';
import { CSS } from '@dnd-kit/utilities';

export const DraggableRow: React.FC<{
  'data-row-key': string;
  children: ReactNode;
}> = ({ 'data-row-key': id, children, ...props }) => {
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    setActivatorNodeRef,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: 'white',

    // the currently dragged element must be visually above the other ones
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return (
    <tr {...props} key={id} ref={setNodeRef} {...attributes} style={style}>
      <td
        ref={setActivatorNodeRef}
        {...listeners}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <HolderOutlined />
      </td>
      {children}
    </tr>
  );
};
