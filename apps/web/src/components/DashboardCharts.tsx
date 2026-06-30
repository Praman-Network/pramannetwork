import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis 
} from 'recharts';

interface ChartData {
  day: string;
  verifications: number;
  failures: number;
}

interface ChartProps {
  data: ChartData[];
}

export function DashboardAreaChart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <defs>
          <linearGradient id="colorVerify" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.2}/>
            <stop offset="95%" stopColor="#00F0FF" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <Tooltip 
          contentStyle={{ backgroundColor: '#090D16', borderColor: 'rgba(0, 240, 255, 0.2)', borderRadius: '12px', fontSize: '11px' }}
          labelClassName="text-slate-400 font-mono text-[9px]"
          itemStyle={{ color: '#00F0FF', fontWeight: 'bold' }}
        />
        <Area type="monotone" dataKey="verifications" stroke="#00F0FF" strokeWidth={1.5} fillOpacity={1} fill="url(#colorVerify)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function DashboardBarChart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <XAxis dataKey="day" stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
        <YAxis stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{ backgroundColor: '#090D16', borderColor: 'rgba(0, 240, 255, 0.2)', borderRadius: '12px', fontSize: '11px' }}
          labelClassName="text-slate-400 font-mono text-[9px]"
        />
        <Bar dataKey="verifications" fill="#00F0FF" radius={[4, 4, 0, 0]} />
        <Bar dataKey="failures" fill="#f43f5e" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
