import React, { useState, useEffect } from 'react';
import { X, Clock, MapPin, AlignLeft, DollarSign, Link as LinkIcon, Briefcase } from 'lucide-react';
import { Activity, ActivityType } from '../types';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: Activity) => void;
  initialData?: Activity | null;
}

const ACTIVITY_TYPES: { value: ActivityType; label: string; color: string }[] = [
  { value: 'sightseeing', label: '景點', color: 'bg-jp-vermilion' },
  { value: 'food', label: '飲食', color: 'bg-jp-matcha' },
  { value: 'transport', label: '交通', color: 'bg-blue-600' },
  { value: 'stay', label: '住宿', color: 'bg-purple-600' },
  { value: 'other', label: '其他', color: 'bg-gray-500' },
];

export const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<Partial<Activity>>({
    time: '',
    title: '',
    location: '',
    notes: '',
    cost: '',
    link: '',
    type: 'sightseeing'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    } else {
      setFormData({
        time: '',
        title: '',
        location: '',
        notes: '',
        cost: '',
        link: '',
        type: 'sightseeing'
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
      ...formData as Activity
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-jp-ink/60 backdrop-blur-sm p-4">
      <div className="bg-jp-cream w-full max-w-md rounded-lg shadow-xl border-2 border-jp-matcha/30 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-jp-matcha text-white px-6 py-4 flex justify-between items-center shrink-0">
          <h2 className="text-xl font-serif font-bold tracking-wide">
            {initialData ? '編輯活動' : '新增活動'}
          </h2>
          <button onClick={onClose} className="hover:bg-white/20 rounded-full p-1 transition">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto custom-scrollbar">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-jp-darkGreen mb-1">活動名稱</label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:border-jp-vermilion focus:ring-1 focus:ring-jp-vermilion outline-none bg-white"
              placeholder="例：淺草寺參拜"
            />
          </div>

          {/* Time & Type Row */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-bold text-jp-darkGreen mb-1 flex items-center gap-1">
                <Clock size={14} /> 時間
              </label>
              <input
                type="text"
                value={formData.time}
                onChange={e => setFormData({...formData, time: e.target.value})}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:border-jp-vermilion outline-none bg-white"
                placeholder="09:00"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-bold text-jp-darkGreen mb-1 flex items-center gap-1">
                <Briefcase size={14} /> 類型
              </label>
              <select
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value as ActivityType})}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:border-jp-vermilion outline-none bg-white"
              >
                {ACTIVITY_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-bold text-jp-darkGreen mb-1 flex items-center gap-1">
              <MapPin size={14} /> 地點
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:border-jp-vermilion outline-none bg-white"
              placeholder="地點名稱"
            />
          </div>

           {/* Link */}
           <div>
            <label className="block text-sm font-bold text-jp-darkGreen mb-1 flex items-center gap-1">
              <LinkIcon size={14} /> Google Maps / 連結
            </label>
            <input
              type="url"
              value={formData.link}
              onChange={e => setFormData({...formData, link: e.target.value})}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:border-jp-vermilion outline-none bg-white text-blue-600"
              placeholder="https://..."
            />
          </div>

          {/* Cost */}
          <div>
            <label className="block text-sm font-bold text-jp-darkGreen mb-1 flex items-center gap-1">
              <DollarSign size={14} /> 花費
            </label>
            <input
              type="text"
              value={formData.cost}
              onChange={e => setFormData({...formData, cost: e.target.value})}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:border-jp-vermilion outline-none bg-white"
              placeholder="¥1000"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-bold text-jp-darkGreen mb-1 flex items-center gap-1">
              <AlignLeft size={14} /> 備註
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:border-jp-vermilion outline-none bg-white resize-none"
              placeholder="預約號碼、特別注意事項..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded text-jp-darkGreen font-bold border border-jp-matcha hover:bg-jp-matcha/10 transition"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded text-white font-bold bg-jp-vermilion shadow-md hover:bg-jp-red hover:shadow-lg transition transform active:scale-95"
            >
              儲存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};