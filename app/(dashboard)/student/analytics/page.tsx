"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { motion } from "framer-motion";
import { BrainCircuit, Target, TrendingUp, Calendar, AlertTriangle } from "lucide-react";

const performanceData = [
  { name: "Week 1", score: 65 },
  { name: "Week 2", score: 68 },
  { name: "Week 3", score: 74 },
  { name: "Week 4", score: 82 },
  { name: "Week 5", score: 85 },
];

const subjectRadarData = [
  { subject: "Anatomy", A: 85, fullMark: 100 },
  { subject: "Pathology", A: 65, fullMark: 100 },
  { subject: "Pharmacology", A: 90, fullMark: 100 },
  { subject: "Physiology", A: 70, fullMark: 100 },
  { subject: "Biochemistry", A: 60, fullMark: 100 },
  { subject: "Microbiology", A: 80, fullMark: 100 },
];

import { useState, useEffect } from "react";

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/student/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8">Loading analytics...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Smart Analytics</h1>
          <p className="text-slate-500 mt-2">AI-driven insights into your performance and weaknesses.</p>
        </div>
        <button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors shadow-lg shadow-blue-600/20">
          Generate Study Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Predicted Rank" value="#4,201" icon={Target} color="text-purple-600" bg="bg-purple-100" />
        <StatCard title="Avg Score" value={`${stats?.averageTestScore || 0}%`} icon={TrendingUp} color="text-green-600" bg="bg-green-100" />
        <StatCard title="Courses" value={stats?.totalEnrollments || 0} icon={Calendar} color="text-orange-600" bg="bg-orange-100" />
        <StatCard title="Arena Runs" value={stats?.totalSimulatorSessions || 0} icon={BrainCircuit} color="text-red-600" bg="bg-red-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" /> Performance Trajectory
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3b82f6" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" /> Weakness Radar
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={subjectRadarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{fill: '#475569', fontSize: 12}} />
                <Radar name="Score" dataKey="A" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Smart Study Planner</h2>
          <p className="text-blue-200 max-w-2xl mb-6">Based on your recent tests, you are struggling with Biochemistry and Pathology. Here is your AI-optimized schedule for today.</p>
          
          <div className="space-y-4">
            <PlanItem time="09:00 AM" title="Biochemistry: Enzyme Kinetics" duration="2 Hours" type="Video + Notes" />
            <PlanItem time="11:30 AM" title="Pathology: Cellular Injury" duration="1.5 Hours" type="Mock Test" />
            <PlanItem time="02:00 PM" title="Anatomy Revision" duration="1 Hour" type="Flashcards" />
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 right-32 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, bg }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4"
    >
      <div className={`p-4 rounded-xl ${bg} ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </motion.div>
  );
}

function PlanItem({ time, title, duration, type }: any) {
  return (
    <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors cursor-pointer">
      <div className="text-blue-200 font-mono text-sm min-w-[80px]">{time}</div>
      <div className="flex-1">
        <h4 className="font-semibold text-white">{title}</h4>
        <div className="text-sm text-blue-300 flex items-center gap-3 mt-1">
          <span>{duration}</span>
          <span className="w-1 h-1 rounded-full bg-blue-300"></span>
          <span>{type}</span>
        </div>
      </div>
      <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-white/0 hover:bg-white transition-colors"></div>
      </div>
    </div>
  );
}
