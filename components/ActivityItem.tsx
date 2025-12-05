import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, MapPin, ExternalLink, Edit2, Trash2 } from 'lucide-react';
import { Activity } from '../types';
import clsx from 'clsx';

interface ActivityItemProps {
  activity: Activity;
  onEdit: (activity: Activity) => void;
  onDelete: (id: string) => void;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ activity, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: activity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'transport': return 'border-l-blue-500 bg-blue-50';
      case 'food': return 'border-l-jp-matcha bg-green-50/50';
      case 'stay': return 'border-l-purple-500 bg-purple-50';
      case 'sightseeing': return 'border-l-jp-vermilion bg-red-50/30';
      default: return 'border-l-gray-400 bg-gray-50';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        "group relative flex items-start gap-3 p-4 mb-3 rounded-md border border-gray-100 shadow-sm bg-white hover:shadow-md transition-all duration-200 border-l-4",
        getTypeColor(activity.type)
      )}
    >
      {/* Drag Handle */}
      <div 
        {...attributes} 
        {...listeners}
        className="mt-1 cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 focus:outline-none"
      >
        <GripVertical size={20} />
      </div>

      {/* Time */}
      <div className="flex flex-col items-center min-w-[60px] pt-0.5">
        <span className="text-lg font-bold text-jp-ink font-serif tracking-tighter leading-none">
          {activity.time}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-lg font-bold text-jp-ink truncate">{activity.title}</h3>
          {activity.link && (
            <a href={activity.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 relative z-20">
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        {activity.location && (
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <MapPin size={14} className="mr-1 text-jp-vermilion" />
            {activity.location}
          </div>
        )}

        {activity.notes && (
          <div className="text-sm text-gray-500 mt-1 bg-black/5 p-2 rounded inline-block max-w-full break-words">
            {activity.notes}
          </div>
        )}
        
        {activity.cost && (
           <div className="text-xs font-mono text-gray-400 mt-1">
             預算: {activity.cost}
           </div>
        )}
      </div>

      {/* Actions */}
      <div className="relative z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEdit(activity);
          }}
          onMouseDown={(e) => e.stopPropagation()}
          className="p-1.5 text-gray-400 hover:text-jp-matcha hover:bg-jp-matcha/10 rounded cursor-pointer"
        >
          <Edit2 size={18} className="pointer-events-none" />
        </button>
        <button 
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(activity.id);
          }}
          onMouseDown={(e) => e.stopPropagation()}
          className="p-1.5 text-gray-400 hover:text-jp-red hover:bg-jp-red/10 rounded cursor-pointer"
        >
          <Trash2 size={18} className="pointer-events-none" />
        </button>
      </div>
    </div>
  );
};