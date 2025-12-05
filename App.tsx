import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useParams, Navigate } from 'react-router-dom';
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent 
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { ChevronLeft, Plus, Calendar, Map, Save, RotateCcw } from 'lucide-react';
import { DayItinerary, Activity, ItineraryState } from './types';
import { INITIAL_ITINERARY } from './constants';
import { ActivityItem } from './components/ActivityItem';
import { EditModal } from './components/EditModal';

// --- Local Storage Hook ---
function useItinerary() {
  const [data, setData] = useState<ItineraryState>(() => {
    const saved = localStorage.getItem('japan-trip-data');
    return saved ? JSON.parse(saved) : { days: INITIAL_ITINERARY };
  });

  useEffect(() => {
    localStorage.setItem('japan-trip-data', JSON.stringify(data));
  }, [data]);

  const updateDayActivities = (dayId: string, newActivities: Activity[]) => {
    setData(prev => ({
      days: prev.days.map(d => d.id === dayId ? { ...d, activities: newActivities } : d)
    }));
  };

  const resetData = () => {
    if(window.confirm('確定要重置所有行程嗎？這將會刪除您的所有更改。')) {
      setData({ days: INITIAL_ITINERARY });
    }
  };

  return { data, updateDayActivities, resetData };
}

// --- Home Page Component ---
const HomePage: React.FC<{ days: DayItinerary[], onReset: () => void }> = ({ days, onReset }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 pb-24">
      <header className="mb-10 text-center relative">
        <div className="inline-block border-b-4 border-jp-red pb-2 mb-2">
           <h1 className="text-4xl font-serif font-bold text-jp-ink">日本旅遊計畫</h1>
        </div>
        <p className="text-jp-darkGreen font-medium mt-2 tracking-widest">JAPAN TRIP 2025</p>
        
        <button 
          onClick={onReset}
          className="absolute right-0 top-0 p-2 text-gray-300 hover:text-jp-red transition"
          title="重置行程"
        >
          <RotateCcw size={16} />
        </button>
      </header>

      <div className="grid gap-6">
        {days.map((day) => (
          <Link 
            key={day.id} 
            to={`/day/${day.id}`}
            className="group block bg-white rounded-lg border-l-8 border-jp-matcha shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div className="p-6 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-jp-matcha text-white text-xs font-bold px-2 py-1 rounded">
                    DAY {day.dayNumber}
                  </span>
                  <span className="text-gray-500 font-mono text-sm">{day.date}</span>
                </div>
                <h2 className="text-2xl font-bold text-jp-ink mb-1 group-hover:text-jp-vermilion transition-colors">
                  {day.locationRegion}
                </h2>
                {day.hotel && (
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Map size={14} /> 宿: {day.hotel}
                  </p>
                )}
              </div>
              <div className="text-gray-300 group-hover:text-jp-vermilion transition-colors">
                <ChevronLeft size={24} className="rotate-180" />
              </div>
            </div>
            
            {/* Preview of first 3 activities */}
            <div className="bg-jp-cream px-6 py-3 border-t border-gray-100 flex gap-2 overflow-hidden whitespace-nowrap mask-linear-fade">
               {day.activities.slice(0, 3).map((act, i) => (
                 <span key={i} className="text-xs text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-full">
                   {act.time} {act.title}
                 </span>
               ))}
               {day.activities.length > 3 && <span className="text-xs text-gray-400 self-center">...</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// --- Day Detail Component ---
const DayDetail: React.FC<{ 
  days: DayItinerary[], 
  onUpdate: (dayId: string, activities: Activity[]) => void 
}> = ({ days, onUpdate }) => {
  const { id } = useParams<{ id: string }>();
  const day = days.find(d => d.id === id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  // Define sensors with activation constraints to allow button clicks to pass through
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Requires 8px movement to start dragging, preventing accidental drags on clicks
      },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  if (!day) return <Navigate to="/" />;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = day.activities.findIndex(a => a.id === active.id);
      const newIndex = day.activities.findIndex(a => a.id === over?.id);
      onUpdate(day.id, arrayMove(day.activities, oldIndex, newIndex));
    }
  };

  const handleSaveActivity = (activity: Activity) => {
    let newActivities = [...day.activities];
    if (editingActivity) {
      // Edit
      newActivities = newActivities.map(a => a.id === activity.id ? activity : a);
    } else {
      // Add - simple auto sort by time string comparison or append
      // For now, let's just append and let user sort, or sort roughly by time
      newActivities.push(activity);
      newActivities.sort((a, b) => a.time.localeCompare(b.time));
    }
    onUpdate(day.id, newActivities);
    setEditingActivity(null);
  };

  const handleDeleteActivity = (actId: string) => {
    // Removed window.confirm to fix responsiveness issues. 
    // If confirmation is needed, a custom modal is better, but for now direct delete is smoother.
    onUpdate(day.id, day.activities.filter(a => a.id !== actId));
  };

  const openAddModal = () => {
    setEditingActivity(null);
    setIsModalOpen(true);
  };

  const openEditModal = (activity: Activity) => {
    setEditingActivity(activity);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-3xl mx-auto min-h-screen flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-jp-cream/90 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all">
        <div className="p-4 flex items-center justify-between">
          <Link to="/" className="flex items-center text-jp-darkGreen hover:text-jp-vermilion transition font-bold">
            <ChevronLeft size={20} /> 返回列表
          </Link>
          <div className="text-center">
            <h1 className="text-xl font-bold font-serif text-jp-ink">Day {day.dayNumber}</h1>
            <p className="text-xs text-gray-500">{day.date} • {day.locationRegion}</p>
          </div>
          <div className="w-20 flex justify-end">
             {/* Placeholder for balance */}
          </div>
        </div>
      </div>

      <div className="p-4 pb-24 flex-1">
        {/* Hotel Info */}
        {day.hotel && (
          <div className="bg-jp-matcha/10 border border-jp-matcha/30 p-4 rounded-lg mb-6 flex items-start gap-3">
            <div className="bg-jp-matcha text-white p-2 rounded-full mt-1">
              <Map size={16} />
            </div>
            <div>
              <h3 className="font-bold text-jp-darkGreen text-sm uppercase tracking-wider mb-1">Accommodation</h3>
              <p className="font-bold text-lg text-jp-ink">{day.hotel}</p>
            </div>
          </div>
        )}

        {/* Drag and Drop List */}
        <DndContext 
          sensors={sensors} 
          collisionDetection={closestCenter} 
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={day.activities.map(a => a.id)} 
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {day.activities.map(activity => (
                <ActivityItem 
                  key={activity.id} 
                  activity={activity} 
                  onEdit={openEditModal}
                  onDelete={handleDeleteActivity}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {day.activities.length === 0 && (
          <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
            <p>尚未新增任何活動</p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-6 z-40">
        <button 
          onClick={openAddModal}
          className="bg-jp-vermilion hover:bg-jp-red text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-2 font-bold"
        >
          <Plus size={24} />
          <span className="hidden sm:inline">新增活動</span>
        </button>
      </div>

      <EditModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveActivity}
        initialData={editingActivity}
      />
    </div>
  );
};

// --- Main App ---
const App: React.FC = () => {
  const { data, updateDayActivities, resetData } = useItinerary();

  return (
    <HashRouter>
      <div className="min-h-screen bg-stone-50 text-jp-ink font-sans selection:bg-jp-matcha/30">
        <Routes>
          <Route path="/" element={<HomePage days={data.days} onReset={resetData} />} />
          <Route 
            path="/day/:id" 
            element={<DayDetail days={data.days} onUpdate={updateDayActivities} />} 
          />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;