/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  Shield,
  List,
  UserPlus,
  Users,
  Megaphone,
  BookOpen,
  ShoppingCart,
  Tags,
  Target,
  BarChart2,
  Monitor,
  Receipt,
  ShieldCheck,
  Settings,
  Bell,
  HelpCircle,
  Plus,
  Search,
  FileText,
  Send,
  Mail,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Info,
  Bold,
  Italic,
  List as ListIcon,
  Link,
  Image as ImageIcon,
  X,
  UploadCloud,
  PlayCircle,
  Star,
  Upload,
  Edit,
  Eye,
  Trash2,
  Tag,
  Database,
  TrendingUp,
  Verified,
  Filter,
  PlusCircle,
  MoreHorizontal,
  Clock,
  ShieldAlert,
  History,
  Save,
  User
} from 'lucide-react';
import {
  pApi,
  trackEvent,
  type PActivity,
  type PEmployee,
  type PLearningCourse,
  type PMallActivity,
  type PMallProduct,
  type PPermissionMatrix,
  type PReconciliationReport,
  type PStatsOverview,
  type PTenant,
} from './lib/api';

const Sidebar = ({ currentView, onViewChange }: { currentView: string, onViewChange: (view: string) => void }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <Shield size={20} />
          </div>
          <h1 className="text-gray-900 text-lg font-bold tracking-tight">保险管理平台</h1>
        </div>
        <p className="text-gray-500 text-xs font-medium pl-10">企业级营销中心</p>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-6 overflow-y-auto pb-4">
        <NavSection title="租户管理" onViewChange={onViewChange} items={[
          { icon: <List size={20} />, label: '租户列表', id: 'tenants', active: currentView === 'tenants' },
          { icon: <UserPlus size={20} />, label: '创建租户', id: 'create-tenant', active: currentView === 'create-tenant' },
          { icon: <Users size={20} />, label: '员工管理', id: 'employees', active: currentView === 'employees' },
        ]} />
        <NavSection title="内容与营销" onViewChange={onViewChange} items={[
          { icon: <Megaphone size={20} />, label: '活动中心', id: 'activity', active: currentView === 'activity' || currentView === 'create' || currentView === 'activity-detail' },
          { icon: <BookOpen size={20} />, label: '学习资料', id: 'learning', active: currentView === 'learning' || currentView === 'learning-create' || currentView === 'learning-detail' },
          { icon: <ShoppingCart size={20} />, label: '积分商城', id: 'shop', active: currentView === 'shop' || currentView === 'shop-add-product' || currentView === 'shop-add-activity' },
        ]} />
        <NavSection title="策略引擎" onViewChange={onViewChange} items={[
          { icon: <Tag size={20} />, label: '标签列表', id: 'tag-list', active: currentView === 'tag-list' },
          { icon: <Tags size={20} />, label: '标签规则库', id: 'tags', active: currentView === 'tags' },
          { icon: <Target size={20} />, label: '策略引擎', id: 'strategy', active: currentView === 'strategy' || currentView === 'strategy-config' },
        ]} />
        <NavSection title="数据统计" onViewChange={onViewChange} items={[
          { icon: <BarChart2 size={20} />, label: '业绩看板', id: 'stats', active: currentView === 'stats' },
        ]} />
        <NavSection title="平台运维" onViewChange={onViewChange} items={[
          { icon: <Monitor size={20} />, label: '监控大屏', id: 'monitor', active: currentView === 'monitor' },
          { icon: <Receipt size={20} />, label: '财务对账', id: 'finance', active: currentView === 'finance' },
          { icon: <ShieldCheck size={20} />, label: '权限管理', id: 'permissions', active: currentView === 'permissions' },
        ]} />
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <img src="https://picsum.photos/seed/user/100/100" alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">管理员张三</p>
            <p className="text-xs text-gray-500 truncate">zhangsan@insurance.com</p>
          </div>
          <Settings size={16} className="text-gray-400" />
        </div>
      </div>
    </aside>
  );
};

const NavSection = ({ title, items, onViewChange }: { title: string, items: any[], onViewChange: (id: string) => void }) => (
  <div className="space-y-1">
    <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</div>
    {items.map((item, idx) => (
      <a
        key={idx}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          if (item.id) onViewChange(item.id);
        }}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
          item.active
            ? 'text-blue-600 bg-blue-50 font-bold'
            : 'text-gray-600 hover:bg-gray-50 font-medium'
        }`}
      >
        <span className={item.active ? 'text-blue-600' : 'text-gray-500'}>{item.icon}</span>
        <span className="text-sm">{item.label}</span>
      </a>
    ))}
  </div>
);

const Header = () => (
  <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
    <div className="flex items-center gap-2 text-sm">
      <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">内容与营销</a>
      <span className="text-gray-300">/</span>
      <span className="text-gray-900 font-medium">活动中心</span>
    </div>
    <div className="flex items-center gap-4">
      <button className="text-gray-500 hover:text-gray-900 relative">
        <Bell size={20} />
        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
      </button>
      <button className="text-gray-500 hover:text-gray-900">
        <HelpCircle size={20} />
      </button>
    </div>
  </header>
);

const MainContent = ({
  onCreateClick,
  onOpenDetail,
  activityRows,
}: {
  onCreateClick: () => void;
  onOpenDetail: (id: string) => void;
  activityRows: Array<{
    id: string;
    name: string;
    type: string;
    version: string;
    status: string;
    updateTime: string;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
  }>;
}) => {
  return (
    <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
      <div className="max-w-[1200px] mx-auto space-y-6">
        {/* Title & Main Actions */}
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">活动中心</h2>
            <p className="text-gray-500 mt-1">管理并监控所有营销活动的生命周期与版本</p>
          </div>
          <button 
            onClick={onCreateClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Plus size={20} />
            <span>新建活动</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">搜索活动</label>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="输入活动名称或关键字..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-600 text-sm placeholder:text-gray-400 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">活动状态</label>
              <div className="relative">
                <select className="w-full pl-4 pr-10 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-600 text-sm appearance-none outline-none text-gray-700 cursor-pointer">
                  <option value="">全部状态</option>
                  <option value="draft">草稿</option>
                  <option value="online">进行中</option>
                  <option value="offline">已下线</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer">查询</button>
              <button className="px-4 py-2 text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors cursor-pointer">重置</button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex gap-8">
            <button className="px-1 pb-4 border-b-2 border-blue-600 text-blue-600 text-sm font-bold cursor-pointer">全部活动</button>
            <button className="px-1 pb-4 border-b-2 border-transparent text-gray-500 hover:text-gray-900 text-sm font-medium cursor-pointer transition-colors">进行中</button>
            <button className="px-1 pb-4 border-b-2 border-transparent text-gray-500 hover:text-gray-900 text-sm font-medium cursor-pointer transition-colors">草稿</button>
            <button className="px-1 pb-4 border-b-2 border-transparent text-gray-500 hover:text-gray-900 text-sm font-medium cursor-pointer transition-colors">已下线</button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">活动名称</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">模板类型</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">当前版本</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">更新时间</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {activityRows.map((activity, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${activity.iconBg} flex items-center justify-center ${activity.iconColor}`}>
                        {activity.icon}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{activity.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">ID: {activity.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                      {activity.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-medium text-gray-700">{activity.version}</span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={activity.status} />
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-500">{activity.updateTime}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3 text-sm font-bold">
                      <button className="text-blue-600 hover:underline cursor-pointer">编辑</button>
                      <button className="text-blue-600 hover:underline cursor-pointer">版本</button>
                      <button onClick={() => onOpenDetail(activity.id)} className="text-blue-600 hover:underline cursor-pointer transition-colors">详情</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-6 py-4 bg-gray-50 flex items-center justify-between border-t border-gray-100">
            <p className="text-xs text-gray-500 font-medium">显示 1 到 4 共 24 条记录</p>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:bg-white transition-colors text-gray-500 cursor-pointer">
                <ChevronLeft size={16} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-blue-600 text-white text-xs font-bold shadow-sm shadow-blue-600/30 cursor-pointer">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:bg-white text-xs font-medium transition-colors text-gray-700 cursor-pointer">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:bg-white text-xs font-medium transition-colors text-gray-700 cursor-pointer">3</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:bg-white text-xs font-medium transition-colors text-gray-700 cursor-pointer">...</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 hover:bg-white transition-colors text-gray-500 cursor-pointer">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  if (status === 'online') {
    return (
      <div className="flex items-center gap-1.5 text-green-600">
        <span className="w-2 h-2 rounded-full bg-green-600"></span>
        <span className="text-sm font-bold">进行中</span>
      </div>
    );
  }
  if (status === 'draft') {
    return (
      <div className="flex items-center gap-1.5 text-gray-400">
        <span className="w-2 h-2 rounded-full bg-gray-400"></span>
        <span className="text-sm font-bold">草稿</span>
      </div>
    );
  }
  if (status === 'offline') {
    return (
      <div className="flex items-center gap-1.5 text-red-500">
        <span className="w-2 h-2 rounded-full bg-red-500"></span>
        <span className="text-sm font-bold">已下线</span>
      </div>
    );
  }
  return null;
};

const defaultActivities = [
  {
    id: 'ACT-20231101-01',
    name: '双十一健康险大促',
    type: 'H5 互动页面',
    version: 'v2.1.4',
    status: 'online',
    updateTime: '2023-11-05 14:30',
    icon: <FileText size={20} />,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 'ACT-20231220-05',
    name: '岁末回馈抽奖活动',
    type: '积分抽奖',
    version: 'v1.0.0',
    status: 'draft',
    updateTime: '2023-10-28 09:15',
    icon: <Send size={20} />,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600'
  },
  {
    id: 'ACT-20230915-02',
    name: '中秋保险礼包推送',
    type: '营销模版',
    version: 'v3.2.0',
    status: 'offline',
    updateTime: '2023-09-30 23:59',
    icon: <Mail size={20} />,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    id: 'ACT-20231110-08',
    name: '风险测试趣味问答',
    type: '趣味问答',
    version: 'v1.1.2',
    status: 'online',
    updateTime: '2023-11-12 18:20',
    icon: <HelpCircle size={20} />,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  }
];

const ActivityDetailPage = ({ onBack, activityId }: { onBack: () => void; activityId: string }) => {
  const activityName = defaultActivities.find((a) => a.id === activityId)?.name || '2024年终保险促销活动';
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
            <ArrowLeft size={16} />
            返回活动中心
          </button>
          <h2 className="text-xl font-bold text-gray-900">活动详情</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 h-10 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700">编辑活动</button>
          <button className="px-4 h-10 rounded-lg border border-red-200 text-sm font-semibold text-red-600 bg-red-50">停止活动</button>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1220px] mx-auto space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-black text-gray-900">{activityName}</h3>
              <span className="px-2 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">进行中</span>
            </div>
            <div className="mt-2 text-sm text-gray-500 flex items-center gap-5">
              <span>创建日期：2024-11-20</span>
              <span>单次奖励：500 积分</span>
              <span>结束倒计时：12天</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">累计参与人数</p>
              <p className="mt-2 text-3xl font-black text-gray-900">12,482</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">累计发放积分</p>
              <p className="mt-2 text-3xl font-black text-blue-600">6,241,000</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">平均转化率</p>
              <p className="mt-2 text-3xl font-black text-gray-900">8.45%</p>
            </div>
          </div>
          <section className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="h-12 px-5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <h4 className="text-sm font-bold text-gray-900">活动内容配置</h4>
              <button className="text-sm text-blue-600 font-semibold">全屏预览</button>
            </div>
            <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="aspect-video rounded-lg bg-gray-100 border border-gray-200 overflow-hidden">
                <img src="https://picsum.photos/seed/act_banner/960/540" alt="活动主图" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">活动文案</p>
                  <p className="mt-2 text-sm text-gray-700 leading-7">暖冬回馈，保障升级。参与活动完成任务即可获赠积分奖励，推荐好友参与可叠加激励。</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 border border-gray-200 rounded-lg text-sm text-gray-700">宣传视频：promo_video_v1.mp4</div>
                  <div className="p-3 border border-gray-200 rounded-lg text-sm text-gray-700">落地页：pages.ins/2024-promo</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const CreateActivity = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center text-gray-500 hover:text-blue-600 transition-colors gap-1 text-sm font-medium cursor-pointer"
          >
            <ArrowLeft size={18} />
            返回列表
          </button>
          <div className="h-4 w-[1px] bg-gray-200"></div>
          <h2 className="text-lg font-bold text-gray-900">创建新活动</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
            <Bell size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
            <HelpCircle size={20} />
          </button>
        </div>
      </header>

      {/* Scrollable Form Container */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Section: Basic Info */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Info size={20} className="text-blue-600" />
                基础信息
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-3">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700 mb-2 block">活动标题 <span className="text-red-500">*</span></span>
                    <input 
                      type="text" 
                      className="w-full rounded-lg border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all px-4 py-2 outline-none" 
                      placeholder="请输入活动标题，例如：春季健康险促销周" 
                    />
                  </label>
                </div>
                <div className="md:col-span-1">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700 mb-2 block">积分</span>
                    <div className="relative">
                      <input 
                        type="number" 
                        className="w-full rounded-lg border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 pr-12 transition-all px-4 py-2 outline-none" 
                        placeholder="0" 
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">积分</span>
                    </div>
                  </label>
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-500 flex items-center gap-1">
                <Info size={14} />
                用户参与并完成活动后将自动获得设定的积分奖励
              </p>
            </div>
          </section>

          {/* Section: Activity Content */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                活动内容
              </h3>
            </div>
            <div className="p-6">
              <label className="block">
                <span className="text-sm font-medium text-gray-700 mb-2 block">活动内容文字</span>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Simple Rich Text Toolbar Simulation */}
                  <div className="flex items-center gap-1 p-2 border-b border-gray-100 bg-gray-50">
                    <button className="p-1.5 hover:bg-gray-200 rounded transition-colors cursor-pointer text-gray-600"><Bold size={18} /></button>
                    <button className="p-1.5 hover:bg-gray-200 rounded transition-colors cursor-pointer text-gray-600"><Italic size={18} /></button>
                    <button className="p-1.5 hover:bg-gray-200 rounded transition-colors cursor-pointer text-gray-600"><ListIcon size={18} /></button>
                    <button className="p-1.5 hover:bg-gray-200 rounded transition-colors cursor-pointer text-gray-600"><Link size={18} /></button>
                    <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
                    <button className="p-1.5 hover:bg-gray-200 rounded transition-colors cursor-pointer text-gray-600"><ImageIcon size={18} /></button>
                  </div>
                  <textarea 
                    className="w-full border-none focus:ring-0 bg-white text-gray-900 p-4 resize-none outline-none" 
                    placeholder="在此输入详细的活动说明、条款规则等内容..." 
                    rows={8}
                  ></textarea>
                </div>
              </label>
            </div>
          </section>

          {/* Section: Media Upload */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <UploadCloud size={20} className="text-blue-600" />
                素材上传
              </h3>
            </div>
            <div className="p-6">
              <span className="text-sm font-medium text-gray-700 mb-2 block">图片/视频</span>
              <div className="grid grid-cols-4 gap-4">
                {/* Placeholder Preview */}
                <div className="relative group aspect-video rounded-lg overflow-hidden border border-gray-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                    <ImageIcon className="text-gray-400 group-hover:scale-110 transition-transform" size={24} />
                  </div>
                  <div className="absolute top-1 right-1">
                    <button className="bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 cursor-pointer">
                      <X size={12} />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/40 text-[10px] text-white backdrop-blur-sm truncate">
                    banner_01.jpg
                  </div>
                </div>
                
                {/* Upload Button Area */}
                <label className="aspect-video cursor-pointer border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-blue-600 hover:bg-blue-50 transition-all group">
                  <Plus className="text-gray-400 group-hover:text-blue-600" size={24} />
                  <span className="text-xs text-gray-500 group-hover:text-blue-600 font-medium">点击上传素材</span>
                  <input type="file" className="hidden" />
                </label>
              </div>
              <p className="mt-3 text-xs text-gray-500">支持 JPG, PNG, MP4 格式，单文件不超过 50MB。建议尺寸 1200x675px。</p>
            </div>
          </section>

          {/* Spacing for Bottom Bar */}
          <div className="h-12"></div>
        </div>
      </div>

      {/* Footer Action Bar */}
      <footer className="bg-white border-t border-gray-200 px-8 py-4 shrink-0 flex items-center justify-end gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button 
          onClick={onBack}
          className="px-6 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors cursor-pointer"
        >
          取消
        </button>
        <button className="px-8 py-2.5 rounded-lg bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/20 hover:bg-blue-700 focus:ring-4 focus:ring-blue-600/30 transition-all flex items-center gap-2 cursor-pointer">
          <Send size={18} />
          发布活动
        </button>
      </footer>
    </div>
  );
};

const TenantListPage = ({ tenants, onCreate, onOpenDetail }: { tenants: PTenant[]; onCreate: () => void; onOpenDetail: () => void }) => {
  const rows = tenants.length
    ? tenants
    : [
        { id: 9821, name: 'Atlas Global Insurance', type: 'company', status: 'active' },
        { id: 4432, name: 'Liam Henderson Agency', type: 'personal', status: 'active' },
        { id: 1055, name: 'Peak Protection Group', type: 'company', status: 'inactive' },
        { id: 2287, name: 'Swift Solutions Ins.', type: 'company', status: 'active' },
      ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#f5f7fb]">
      <header className="h-16 border-b border-gray-200 bg-white px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">租户管理</h2>
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">{rows.length} 已激活</span>
        </div>
        <button
          onClick={onCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20"
        >
          <Plus size={18} />
          创建新租户
        </button>
      </header>
      <main className="flex-1 overflow-auto p-8">
        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder="搜索租户名称、ID或管理员邮箱..."
              />
            </div>
            <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 flex items-center gap-2">
              <Filter size={16} />
              更多筛选
            </button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">租户名称</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">类型</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">租户ID</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">状态</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row: any) => (
                <tr key={row.id} className="hover:bg-gray-50/70">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{row.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{row.type === 'company' ? '公司' : '个人'}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">TNT-{row.id}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        row.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {row.status === 'active' ? '已激活' : '未激活'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={onOpenDetail} className="text-blue-600 hover:text-blue-700 text-sm font-bold">修改</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

const CreateTenantPage = ({
  onCancel,
  onCreate,
}: {
  onCancel: () => void;
  onCreate: (payload: { name: string; type: 'company' | 'individual' }) => Promise<void>;
}) => {
  const [tenantType, setTenantType] = useState<'company' | 'personal'>('company');
  const [plan, setPlan] = useState<'basic' | 'pro' | 'enterprise'>('basic');
  const [tenantName, setTenantName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#f5f7fb]">
      <header className="h-16 border-b border-gray-200 bg-white px-8 flex items-center justify-between shrink-0">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">创建新租户</h2>
      </header>
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <p className="text-sm font-bold text-gray-700 mb-3">租户类别</p>
            <div className="rounded-xl p-1 bg-gray-100 flex">
              <button
                onClick={() => setTenantType('company')}
                className={`flex-1 py-2 text-sm rounded-lg font-semibold ${tenantType === 'company' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}
              >
                公司
              </button>
              <button
                onClick={() => setTenantType('personal')}
                className={`flex-1 py-2 text-sm rounded-lg font-semibold ${tenantType === 'personal' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}
              >
                个人代理
              </button>
            </div>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="text-sm font-semibold text-gray-700">
              {tenantType === 'company' ? '公司名称' : '代理名称'}
              <input
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder={tenantType === 'company' ? 'e.g. Acme Corporation' : 'e.g. Liam Henderson'}
              />
            </label>
            <label className="text-sm font-semibold text-gray-700">
              营业执照代码
              <input className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/30" placeholder="BL-12345-X" />
            </label>
            <label className="text-sm font-semibold text-gray-700">
              管理员邮箱
              <input className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/30" placeholder="admin@company.com" />
            </label>
            <label className="text-sm font-semibold text-gray-700">
              初始密码
              <input type="password" className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/30" placeholder="至少 12 位字符" />
            </label>
          </div>
          <div className="px-6 pb-6">
            <p className="text-sm font-bold text-gray-700 mb-3">订阅套餐</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { key: 'basic', name: '基础版', desc: '支持 10 个用户', price: '$49/mo' },
                { key: 'pro', name: '专业版', desc: '支持 50 个用户', price: '$199/mo' },
                { key: 'enterprise', name: '企业版', desc: '无限制用户', price: '定制' },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setPlan(item.key as any)}
                  className={`p-4 rounded-xl border text-left ${plan === item.key ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}
                >
                  <div className="text-base font-bold text-gray-900">{item.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
                  <div className="text-2xl font-black text-blue-600 mt-3">{item.price}</div>
                </button>
              ))}
            </div>
          </div>
          {submitError && (
            <div className="mx-6 mb-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">{submitError}</div>
          )}
          <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
            <button onClick={onCancel} className="px-4 py-2 text-sm font-semibold text-gray-600">
              取消
            </button>
            <button
              disabled={submitting}
              onClick={async () => {
                const name = tenantName.trim();
                if (!name) {
                  setSubmitError('请输入租户名称');
                  return;
                }
                try {
                  setSubmitting(true);
                  setSubmitError('');
                  await onCreate({ name, type: tenantType === 'company' ? 'company' : 'individual' });
                } catch (err: any) {
                  setSubmitError(err?.message || '创建租户失败');
                } finally {
                  setSubmitting(false);
                }
              }}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? '创建中...' : '创建租户'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

const MallManagementPage = ({
  onAddProduct,
  onAddActivity,
  products,
  activities,
}: {
  onAddProduct: () => void;
  onAddActivity: () => void;
  products: PMallProduct[];
  activities: PMallActivity[];
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'activities'>('products');
  const productRows = products.length
    ? products.map((row) => ({
        order: (row as any).sortOrder || row.id,
        name: (row as any).title || (row as any).name || `商品-${row.id}`,
        points: Number((row as any).points ?? (row as any).pointsCost ?? 0).toLocaleString(),
        stock: Number(row.stock || 0),
        status: ((row as any).status === 'active' || (row as any).shelfStatus === 'on') ? '进行中' : '已结束',
        updatedAt: String((row as any).updatedAt || (row as any).createdAt || '').slice(0, 16).replace('T', ' '),
      }))
    : [
        { order: 1, name: '精品限定手办 - 晴天娃娃', points: '5,000', stock: 128, status: '进行中', updatedAt: '2023-11-20 14:30' },
      ];
  const activityRows = activities.length
    ? activities.map((row) => ({
        order: (row as any).sortOrder || row.id,
        name: row.title,
        type: (row as any).type || (row as any).category || 'task',
        reward: Number((row as any).rewardPoints || 0).toLocaleString(),
        status: ((row as any).status === 'active' || (row as any).status === 'published') ? '进行中' : '已结束',
        updatedAt: String((row as any).updatedAt || (row as any).createdAt || '').slice(0, 16).replace('T', ' '),
      }))
    : [
        { order: 1, name: '健康跑挑战赛', type: '教育问答', reward: '500', status: '进行中', updatedAt: '2023-11-23 11:20' },
      ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between shrink-0">
        <h2 className="text-2xl font-bold text-gray-900">积分商城</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input className="h-11 w-72 rounded-xl bg-gray-100 border-none pl-10 pr-4 text-sm outline-none" placeholder="搜索商品..." />
          </div>
          <button className="px-5 h-11 rounded-xl bg-blue-600 text-white text-sm font-bold">个人中心</button>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1180px] mx-auto space-y-6">
          <div className="flex items-center gap-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('products')}
              className={`pb-3 text-sm font-semibold ${activeTab === 'products' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
              商品货架
            </button>
            <button
              onClick={() => setActiveTab('activities')}
              className={`pb-3 text-sm font-semibold ${activeTab === 'activities' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
              活动货架
            </button>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{activeTab === 'products' ? '商品货架管理' : '活动货架管理'}</h3>
              <p className="text-gray-500 mt-1">管理积分商城中所有可兑换内容</p>
            </div>
            <button
              onClick={activeTab === 'products' ? onAddProduct : onAddActivity}
              className="px-5 h-12 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20 flex items-center gap-2"
            >
              <Plus size={16} />
              {activeTab === 'products' ? '新增上架商品' : '新增上架活动'}
            </button>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">展示排序</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">{activeTab === 'products' ? '商品名称' : '活动名称'}</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">{activeTab === 'products' ? '所需积分' : '活动类型'}</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">{activeTab === 'products' ? '库存' : '关联积分奖励'}</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">状态</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">更新时间</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(activeTab === 'products' ? productRows : activityRows).map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="inline-flex w-12 h-9 rounded-lg bg-gray-100 items-center justify-center text-sm font-bold text-gray-700">{row.order}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 max-w-xs">{row.name}</td>
                    <td className="px-6 py-4 text-sm font-bold text-blue-600">{activeTab === 'products' ? (row as any).points : (row as any).type}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{activeTab === 'products' ? (row as any).stock : (row as any).reward}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${(row as any).status === '进行中' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                        {(row as any).status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{(row as any).updatedAt}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-4 text-sm font-bold">
                        <button className="text-blue-600">编辑</button>
                        <button className="text-red-500">删除</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

const AddMallProductPage = ({
  onBack,
  onSubmit,
}: {
  onBack: () => void;
  onSubmit: (payload: { title: string; points: number; stock: number; sortOrder: number }) => Promise<void>;
}) => {
  const [title, setTitle] = useState('');
  const [points, setPoints] = useState(0);
  const [stock, setStock] = useState(0);
  const [sortOrder, setSortOrder] = useState(99);
  const [submitting, setSubmitting] = useState(false);
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={16} />
            返回
          </button>
          <span className="text-gray-300">|</span>
          <div className="text-sm text-gray-500">内容与营销 &gt; 积分商城 &gt; 新增商品</div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="px-6 h-10 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold">取消</button>
          <button
            onClick={async () => {
              if (!title.trim()) return;
              try {
                setSubmitting(true);
                await onSubmit({ title: title.trim(), points, stock, sortOrder });
              } finally {
                setSubmitting(false);
              }
            }}
            className="px-6 h-10 rounded-xl bg-blue-600 text-white text-sm font-bold"
          >
            {submitting ? '保存中...' : '保存并上架'}
          </button>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1180px] mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">新增商城商品</h2>
          <p className="text-gray-500 mt-2">在积分商城中创建一个新的兑换商品，请填写详细信息。</p>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 text-xl font-bold text-gray-900">基础信息</div>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <label className="text-sm font-bold text-gray-800">商品标题 *
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 w-full h-11 rounded-xl border border-gray-200 px-4 text-sm outline-none" placeholder="例如：高端定制体检套餐" />
                  </label>
                  <label className="text-sm font-bold text-gray-800">所需积分 *
                    <div className="mt-2 relative">
                      <input value={points} onChange={(e) => setPoints(Number(e.target.value || 0))} className="w-full h-11 rounded-xl border border-gray-200 px-4 pr-10 text-sm outline-none" placeholder="请输入分值" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">积分</span>
                    </div>
                  </label>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <label className="text-sm font-bold text-gray-800">商品分类
                    <select className="mt-2 w-full h-11 rounded-xl border border-gray-200 px-4 text-sm outline-none"><option>实物礼品 (Gift)</option></select>
                  </label>
                  <label className="text-sm font-bold text-gray-800">初始库存
                    <input value={stock} onChange={(e) => setStock(Number(e.target.value || 0))} className="mt-2 w-full h-11 rounded-xl border border-gray-200 px-4 text-sm outline-none" />
                  </label>
                  <label className="text-sm font-bold text-gray-800">上架排序
                    <input value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value || 99))} className="mt-2 w-full h-11 rounded-xl border border-gray-200 px-4 text-sm outline-none" />
                  </label>
                </div>
                <label className="block text-sm font-bold text-gray-800">商品描述
                  <div className="mt-2 border border-gray-200 rounded-xl overflow-hidden">
                    <div className="h-11 px-4 flex items-center gap-3 bg-gray-50 border-b border-gray-100">
                      <Bold size={16} /><Italic size={16} /><ListIcon size={16} /><ImageIcon size={16} /><Link size={16} />
                    </div>
                    <textarea className="w-full min-h-52 p-4 text-sm outline-none resize-none" placeholder="请输入详细的商品兑换说明、使用规则等内容..." />
                  </div>
                </label>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 text-xl font-bold text-gray-900">商品图片</div>
                <div className="p-6">
                  <div className="h-72 border-2 border-dashed border-blue-100 rounded-2xl bg-blue-50/20 flex flex-col items-center justify-center text-center">
                    <UploadCloud size={30} className="text-blue-600" />
                    <p className="text-lg font-semibold text-gray-900 mt-4">点击上传图片</p>
                    <p className="text-xs text-gray-400 mt-2">支持 JPG, PNG, WEBP (最大 2MB)</p>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 text-xl font-bold text-gray-900">兑换设置</div>
                <div className="p-6 space-y-4 text-sm">
                  <label className="flex items-center justify-between"><span>限制每人兑换数量</span><input type="checkbox" /></label>
                  <label className="flex items-center justify-between"><span>仅限VIP用户兑换</span><input type="checkbox" /></label>
                  <label className="flex items-center justify-between"><span>开启活动倒计时</span><input type="checkbox" /></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const AddMallActivityPage = ({
  onBack,
  onSubmit,
}: {
  onBack: () => void;
  onSubmit: (payload: { title: string; type: string; rewardPoints: number; sortOrder: number }) => Promise<void>;
}) => {
  const [title, setTitle] = useState('');
  const [displayTitle, setDisplayTitle] = useState('');
  const [type, setType] = useState('task');
  const [rewardPoints, setRewardPoints] = useState(0);
  const [sortOrder, setSortOrder] = useState(10);
  const [submitting, setSubmitting] = useState(false);
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={16} />
            返回
          </button>
          <span className="text-gray-300">|</span>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Megaphone size={20} /> 积分商城管理</h2>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="px-6 h-10 rounded-xl border border-gray-200 text-gray-700 font-semibold">取消</button>
          <button
            onClick={async () => {
              if (!title.trim() && !displayTitle.trim()) return;
              try {
                setSubmitting(true);
                await onSubmit({
                  title: (displayTitle || title).trim(),
                  type,
                  rewardPoints,
                  sortOrder,
                });
              } finally {
                setSubmitting(false);
              }
            }}
            className="px-6 h-10 rounded-xl bg-blue-600 text-white font-bold"
          >
            {submitting ? '上架中...' : '确认并上架'}
          </button>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-sm text-gray-500">积分商城 &gt; 活动货架 &gt; 新增上架活动</div>
          <h2 className="text-3xl font-bold text-gray-900 mt-3">新增上架活动</h2>
          <p className="text-gray-500 mt-2">配置活动在积分商城货架上的展示方式。</p>
          <div className="mt-6 bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 text-xl font-bold text-gray-900">活动配置</div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="text-sm font-bold text-gray-800">活动名称 *
                  <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 w-full h-11 rounded-xl border border-gray-200 px-4 text-sm outline-none" placeholder="从活动中心选择" />
                </label>
                <label className="text-sm font-bold text-gray-800">展示标题 *
                  <input value={displayTitle} onChange={(e) => setDisplayTitle(e.target.value)} className="mt-2 w-full h-11 rounded-xl border border-gray-200 px-4 text-sm outline-none" placeholder="输入在积分商城的展示名称" />
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-2">展示图片</p>
                  <div className="h-44 border-2 border-dashed border-blue-100 rounded-2xl bg-blue-50/20 flex flex-col items-center justify-center text-center">
                    <ImageIcon size={24} className="text-blue-600" />
                    <p className="text-blue-600 text-sm font-semibold mt-3">点击上传 或拖拽文件至此</p>
                    <p className="text-xs text-gray-400 mt-1">支持 PNG, JPG, GIF，最大 2MB</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-800 block">活动类型
                    <select value={type} onChange={(e) => setType(e.target.value)} className="mt-2 w-full h-11 rounded-xl border border-gray-200 px-4 text-sm outline-none">
                      <option value="task">任务活动</option>
                      <option value="competition">竞赛活动</option>
                      <option value="invite">邀请活动</option>
                    </select>
                  </label>
                  <label className="text-sm font-bold text-gray-800 block">所需积分
                    <div className="mt-2 relative">
                      <input value={rewardPoints} onChange={(e) => setRewardPoints(Number(e.target.value || 0))} className="w-full h-11 rounded-xl border border-gray-200 px-4 pr-10 text-sm outline-none" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">积分</span>
                    </div>
                  </label>
                  <label className="text-sm font-bold text-gray-800 block">显示排序
                    <input value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value || 10))} className="mt-2 w-full h-11 rounded-xl border border-gray-200 px-4 text-sm outline-none" placeholder="例如：10" />
                  </label>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800 mb-2">活动描述（预览）</p>
                <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 text-gray-500">
                  请从下拉列表中选择一个活动，以预览其原始配置和描述。此字段为只读，直接从活动中心素材中调取。
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button className="px-6 h-10 rounded-xl border border-gray-200 text-gray-700 font-semibold">保存草稿</button>
              <button className="px-6 h-10 rounded-xl bg-blue-600 text-white font-bold">确认并上架</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const TenantDetailPage = ({ onBack }: { onBack: () => void }) => (
  <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
    <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center gap-4">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600"><ArrowLeft size={16} />返回</button>
      <h2 className="text-xl font-bold text-gray-900">租户详情与配额</h2>
    </header>
    <main className="flex-1 overflow-auto p-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-gray-900">租户基础信息</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-gray-500">租户名称</span><p className="font-semibold mt-1">Atlas Global Insurance</p></div>
            <div><span className="text-gray-500">租户类型</span><p className="font-semibold mt-1">公司</p></div>
            <div><span className="text-gray-500">管理员邮箱</span><p className="font-semibold mt-1">admin@atlas.com</p></div>
            <div><span className="text-gray-500">状态</span><p className="font-semibold mt-1 text-emerald-600">已激活</p></div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900">套餐配额</h3>
          <p className="text-sm text-gray-500 mt-1">企业版</p>
          <div className="mt-5 space-y-3 text-sm">
            <div><p className="text-gray-500">用户数</p><p className="font-semibold">42 / 100</p></div>
            <div><p className="text-gray-500">活动数</p><p className="font-semibold">18 / 50</p></div>
            <div><p className="text-gray-500">素材存储</p><p className="font-semibold">12.4GB / 50GB</p></div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

const LabelListPage = () => (
  <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
    <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-gray-900">标签列表</h2>
        <span className="text-sm text-gray-500">营销策略 / 标签列表</span>
      </div>
      <button className="px-4 h-10 rounded-lg bg-blue-600 text-white text-sm font-bold">新建标签</button>
    </header>
    <main className="flex-1 overflow-auto p-8">
      <div className="max-w-[1220px] mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-sm text-gray-500">标签总数</p>
            <p className="mt-2 text-3xl font-black text-gray-900">1,284</p>
            <p className="mt-1 text-xs text-emerald-600 font-semibold">较上月 +12%</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-sm text-gray-500">今日新增</p>
            <p className="mt-2 text-3xl font-black text-gray-900">56</p>
            <p className="mt-1 text-xs text-gray-400">新增自定义标签</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-sm text-gray-500">活跃标签</p>
            <p className="mt-2 text-3xl font-black text-gray-900">856</p>
            <p className="mt-1 text-xs text-gray-400">过去 7 天有命中</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-sm text-gray-500">覆盖客户数</p>
            <p className="mt-2 text-3xl font-black text-gray-900">12,430</p>
            <p className="mt-1 text-xs text-gray-400">去重后客户</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="搜索标签名称、编码或创建人"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 font-semibold flex items-center gap-2">
              <Filter size={16} />
              筛选
            </button>
            <button className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold">批量操作</button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">标签名称</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">标签编码</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">命中人数</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">标签来源</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">更新时间</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ['高净值', 'TAG_HNW_001', 1240, '规则引擎', '2026-02-25 10:32'],
                ['养老规划', 'TAG_RET_019', 865, '手动创建', '2026-02-24 19:10'],
                ['续保意向', 'TAG_RENEW_024', 1188, '规则引擎', '2026-02-24 14:28'],
                ['新线索', 'TAG_LEAD_007', 334, '导入同步', '2026-02-23 21:02'],
              ].map((row) => (
                <tr key={row[1] as string} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{row[0]}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row[1]}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 font-semibold">{(row[2] as number).toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{row[3]}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{row[4]}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-blue-600 text-sm font-bold">编辑</button>
                      <button className="text-red-500 text-sm font-bold">删除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <p className="text-xs text-gray-500">显示 1 到 4，共 1284 条</p>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded border border-gray-200 text-gray-500 flex items-center justify-center">
                <ChevronLeft size={14} />
              </button>
              <button className="w-8 h-8 rounded bg-blue-600 text-white text-xs font-bold">1</button>
              <button className="w-8 h-8 rounded border border-gray-200 text-xs font-semibold text-gray-700">2</button>
              <button className="w-8 h-8 rounded border border-gray-200 text-xs font-semibold text-gray-700">3</button>
              <button className="w-8 h-8 rounded border border-gray-200 text-gray-500 flex items-center justify-center">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

const StrategyListPage = ({ onCreate }: { onCreate: () => void }) => (
  <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
    <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-900">策略引擎</h2>
      <button onClick={onCreate} className="px-4 h-10 rounded-lg bg-blue-600 text-white text-sm font-bold">新增策略引擎</button>
    </header>
    <main className="flex-1 overflow-auto p-8">
      <div className="max-w-[1220px] mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="h-14 px-5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <div className="relative w-96">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input className="w-full h-9 rounded-lg border border-gray-200 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="搜索策略名称/策略ID..." />
          </div>
          <span className="text-xs text-gray-500">共 3 条策略</span>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-3 text-xs uppercase text-gray-500 font-bold">策略名称</th>
              <th className="px-5 py-3 text-xs uppercase text-gray-500 font-bold">策略ID</th>
              <th className="px-5 py-3 text-xs uppercase text-gray-500 font-bold">状态</th>
              <th className="px-5 py-3 text-xs uppercase text-gray-500 font-bold">最近执行</th>
              <th className="px-5 py-3 text-xs uppercase text-gray-500 font-bold text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              ['高净值客户自动成交', 'POLICY-20260225-01', '启用', '2026-02-25 10:32'],
              ['高潜客7天跟进提醒', 'POLICY-20260224-02', '启用', '2026-02-25 09:10'],
              ['沉默客户激活流程', 'POLICY-20260221-01', '草稿', '-'],
            ].map((row) => (
              <tr key={row[1]} className="hover:bg-gray-50">
                <td className="px-5 py-4 text-sm font-semibold text-gray-900">{row[0]}</td>
                <td className="px-5 py-4 text-sm text-gray-700">{row[1]}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${row[2] === '启用' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>{row[2]}</span>
                </td>
                <td className="px-5 py-4 text-sm text-gray-600">{row[3]}</td>
                <td className="px-5 py-4 text-right">
                  <button onClick={onCreate} className="text-blue-600 text-sm font-bold">编辑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  </div>
);

const StrategyCanvasPage = ({ onBack }: { onBack: () => void }) => (
  <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
    <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
          <ArrowLeft size={16} />
          返回列表
        </button>
        <h2 className="text-xl font-bold text-gray-900">策略引擎配置</h2>
      </div>
      <button className="px-4 h-10 rounded-lg bg-blue-600 text-white text-sm font-bold">发布策略</button>
    </header>
    <main className="flex-1 overflow-auto p-8">
      <div className="max-w-[1320px] mx-auto space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
              <p className="text-xs text-blue-600 font-bold uppercase">触发器</p>
              <p className="mt-2 font-semibold text-gray-900">客户标签命中：高净值</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
              <p className="text-xs text-emerald-600 font-bold uppercase">条件</p>
              <p className="mt-2 font-semibold text-gray-900">7天内未跟进</p>
            </div>
            <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
              <p className="text-xs text-orange-600 font-bold uppercase">动作</p>
              <p className="mt-2 font-semibold text-gray-900">分配给指定业务员并推送提醒</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <section className="xl:col-span-3 rounded-2xl border border-gray-200 bg-white overflow-hidden">
            <div className="h-12 px-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <div className="text-sm font-semibold text-gray-700">画布区</div>
              <div className="flex items-center gap-2 text-xs">
                <button className="px-3 h-8 rounded-lg border border-gray-200 text-gray-600 bg-white">缩小</button>
                <button className="px-3 h-8 rounded-lg border border-gray-200 text-gray-600 bg-white">100%</button>
                <button className="px-3 h-8 rounded-lg border border-gray-200 text-gray-600 bg-white">放大</button>
              </div>
            </div>
            <div className="p-6 bg-[radial-gradient(circle_at_1px_1px,#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] min-h-[520px]">
              <div className="flex items-center gap-4">
                <div className="w-60 p-4 rounded-xl border border-blue-200 bg-blue-50">
                  <p className="text-xs font-bold text-blue-600">触发器</p>
                  <p className="mt-2 text-sm font-semibold text-gray-900">命中标签：高净值</p>
                </div>
                <div className="h-[2px] w-12 bg-blue-300" />
                <div className="w-60 p-4 rounded-xl border border-emerald-200 bg-emerald-50">
                  <p className="text-xs font-bold text-emerald-600">条件</p>
                  <p className="mt-2 text-sm font-semibold text-gray-900">7天未跟进</p>
                </div>
                <div className="h-[2px] w-12 bg-blue-300" />
                <div className="w-64 p-4 rounded-xl border border-orange-200 bg-orange-50">
                  <p className="text-xs font-bold text-orange-600">动作</p>
                  <p className="mt-2 text-sm font-semibold text-gray-900">自动分配线索 + 发送提醒</p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-gray-200 bg-white">
                  <p className="text-xs text-gray-500">策略ID</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">POLICY-20260225-01</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 bg-white">
                  <p className="text-xs text-gray-500">命中客户</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">128 人</p>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 bg-white">
                  <p className="text-xs text-gray-500">执行成功率</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-600">98.7%</p>
                </div>
              </div>
            </div>
          </section>

          <aside className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
            <div className="h-12 px-4 border-b border-gray-100 bg-gray-50 flex items-center">
              <span className="text-sm font-semibold text-gray-700">规则属性</span>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <p className="text-xs text-gray-500">策略名称</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">高净值客户自动跟进</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">优先级</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">P1</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">执行频率</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">每 1 小时</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">最近执行</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">2026-02-25 10:32</p>
              </div>
              <button className="w-full h-10 rounded-lg bg-blue-600 text-white text-sm font-bold">保存草稿</button>
            </div>
          </aside>
        </div>

        <section className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
          <div className="h-12 px-4 border-b border-gray-100 bg-gray-50 flex items-center">
            <span className="text-sm font-semibold text-gray-700">执行日志</span>
          </div>
          <div className="p-4">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs uppercase text-gray-500">
                  <th className="py-2">时间</th>
                  <th className="py-2">目标客户</th>
                  <th className="py-2">执行动作</th>
                  <th className="py-2">结果</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                <tr>
                  <td className="py-3">2026-02-25 10:32:10</td>
                  <td className="py-3">C-10982</td>
                  <td className="py-3">分配给业务员 A12</td>
                  <td className="py-3 text-emerald-600 font-semibold">成功</td>
                </tr>
                <tr>
                  <td className="py-3">2026-02-25 10:31:42</td>
                  <td className="py-3">C-10711</td>
                  <td className="py-3">发送跟进提醒</td>
                  <td className="py-3 text-emerald-600 font-semibold">成功</td>
                </tr>
                <tr>
                  <td className="py-3">2026-02-25 10:30:58</td>
                  <td className="py-3">C-10267</td>
                  <td className="py-3">分配给业务员 B03</td>
                  <td className="py-3 text-orange-600 font-semibold">重试中</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  </div>
);

const MonitorScreenPage = () => (
  <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
    <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center">
      <h2 className="text-xl font-bold text-gray-900">平台监控大屏</h2>
    </header>
    <main className="flex-1 overflow-auto p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
      {[
        ['在线租户', '42'],
        ['今日请求量', '128,330'],
        ['错误率', '0.12%'],
        ['平均响应', '83ms'],
      ].map(([k, v]) => (
        <div key={k} className="bg-white border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-500">{k}</p>
          <p className="text-3xl font-black text-gray-900 mt-2">{v}</p>
        </div>
      ))}
    </main>
  </div>
);

const FinanceReconcilePage = ({
  reports,
  onRun,
}: {
  reports: PReconciliationReport[];
  onRun: () => Promise<void>;
}) => (
  <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
    <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-900">财务对账</h2>
      <button onClick={() => void onRun()} className="px-4 h-10 rounded-lg bg-blue-600 text-white text-sm font-bold">发起对账</button>
    </header>
    <main className="flex-1 overflow-auto p-8">
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">批次号</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">日期</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">状态</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">差异金额</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(reports.length
              ? reports.map((row) => [
                  `RC-${row.day.replaceAll('-', '')}-${String(row.id).padStart(2, '0')}`,
                  row.day,
                  row.status === 'ok' ? '完成' : '存在差异',
                  String(row.mismatches.length),
                ])
              : [['RC-20260225-01', '2026-02-25', '完成', '0']]).map((r) => (
              <tr key={r[0] as string}>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{r[0]}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{r[1]}</td>
                <td className={`px-6 py-4 text-sm font-semibold ${(r[2] as string) === '完成' ? 'text-emerald-600' : 'text-orange-600'}`}>{r[2]}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  </div>
);

const StatsDashboardPage = ({
  statsRole,
  setStatsRole,
  tenants,
  stats,
  onRebuild,
}: {
  statsRole: 'platform' | 'company' | 'staff';
  setStatsRole: (role: 'platform' | 'company' | 'staff') => void;
  tenants: PTenant[];
  stats: PStatsOverview | null;
  onRebuild: () => Promise<void>;
}) => {
  const latest = stats?.latest?.metrics || {};
  const customers = Number(latest.customers || 0);
  const activeCustomers = Number(latest.activeCustomers || 0);
  const paidOrders = Number(latest.paidOrders || 0);
  const totalPoints = Number(latest.totalPoints || 0);
  const activeRate = customers > 0 ? Math.round((activeCustomers / customers) * 100) : 0;

  const trendDays = (stats?.history || []).slice(-7).map((d) => d.day.slice(5));
  const trendCustomers = (stats?.history || []).slice(-7).map((d) => Number(d.metrics.activeCustomers || 0));
  const maxTrend = Math.max(...trendCustomers, 1);
  const rankingRows = [
    { name: '李晓梅', team: '个险一部', amount: 1240500, progress: 92 },
    { name: '王志刚', team: '团险三部', amount: 1105200, progress: 85 },
    { name: '赵振华', team: '高端寿险组', amount: 982000, progress: 76 },
    { name: '陈婉晴', team: '理财险二部', amount: 870400, progress: 68 },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#f6f7fb]">
      <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-5">
          <h2 className="text-xl font-bold text-gray-900">业绩看板</h2>
          <div className="flex items-center rounded-lg bg-gray-100 p-1">
            <button onClick={() => setStatsRole('platform')} className={`px-4 h-8 rounded-md text-xs font-semibold ${statsRole === 'platform' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}>平台管理员</button>
            <button onClick={() => setStatsRole('company')} className={`px-4 h-8 rounded-md text-xs font-semibold ${statsRole === 'company' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}>公司管理员</button>
            <button onClick={() => setStatsRole('staff')} className={`px-4 h-8 rounded-md text-xs font-semibold ${statsRole === 'staff' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}>员工</button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onRebuild} className="px-4 h-9 rounded-lg bg-blue-600 text-white text-sm font-semibold">刷新统计</button>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1280px] mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-xs text-gray-500 font-semibold">租户总数</p>
              <p className="mt-2 text-3xl font-black text-gray-900">{tenants.length}</p>
              <p className="mt-1 text-xs text-gray-400">最近统计日 {stats?.latest?.day || '-'}</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-xs text-gray-500 font-semibold">客户总数</p>
              <p className="mt-2 text-3xl font-black text-gray-900">{customers.toLocaleString()}</p>
              <p className="mt-1 text-xs text-gray-400">活跃客户 {activeCustomers.toLocaleString()}</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-xs text-gray-500 font-semibold">支付订单</p>
              <p className="mt-2 text-3xl font-black text-gray-900">{paidOrders.toLocaleString()}</p>
              <p className="mt-1 text-xs text-gray-400">活跃率 {activeRate}%</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-xs text-gray-500 font-semibold">累计积分发放</p>
              <p className="mt-2 text-3xl font-black text-gray-900">{totalPoints.toLocaleString()}</p>
              <p className="mt-1 text-xs text-gray-400">当前视角 {statsRole === 'platform' ? '平台管理员' : statsRole === 'company' ? '公司管理员' : '员工'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <section className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900">活跃客户趋势（近7天）</h3>
                <span className="text-xs text-gray-500">数据来源 /api/p/stats/overview</span>
              </div>
              <div className="h-52 flex items-end gap-3">
                {trendCustomers.map((v, idx) => (
                  <div key={`${trendDays[idx]}-${idx}`} className="flex-1 flex flex-col items-center justify-end gap-2">
                    <div className="w-full rounded-t-md bg-blue-500/75 hover:bg-blue-600 transition-colors" style={{ height: `${Math.max(12, Math.round((v / maxTrend) * 160))}px` }} />
                    <span className="text-[11px] text-gray-400">{trendDays[idx] || '-'}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-4">目标完成进度</h3>
              <div className="space-y-4">
                {[
                  ['月签单目标', 85],
                  ['新增客户目标', 73],
                  ['活跃转化目标', 67],
                ].map(([name, p]) => (
                  <div key={String(name)}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">{name}</span>
                      <span className="font-semibold text-gray-900">{p}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full bg-blue-600" style={{ width: `${p}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="px-5 h-12 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">团队业绩排行</h3>
              <span className="text-xs text-gray-500">Top 4</span>
            </div>
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-xs uppercase text-gray-500 font-bold">排名</th>
                  <th className="px-5 py-3 text-xs uppercase text-gray-500 font-bold">员工</th>
                  <th className="px-5 py-3 text-xs uppercase text-gray-500 font-bold">部门</th>
                  <th className="px-5 py-3 text-xs uppercase text-gray-500 font-bold">签单金额</th>
                  <th className="px-5 py-3 text-xs uppercase text-gray-500 font-bold">进度</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rankingRows.map((row, idx) => (
                  <tr key={row.name} className="hover:bg-gray-50">
                    <td className="px-5 py-4 text-sm font-bold text-blue-600">{String(idx + 1).padStart(2, '0')}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-gray-900">{row.name}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{row.team}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-gray-900">¥{row.amount.toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <div className="w-40 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full rounded-full bg-blue-600" style={{ width: `${row.progress}%` }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  );
};

function LearningDetailViewPage({ onBack, title }: { onBack: () => void; title: string }) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
            <ArrowLeft size={16} />
            返回学习资料
          </button>
          <h2 className="text-xl font-bold text-gray-900">学习资料详情</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 h-10 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700">编辑资料</button>
          <button className="px-4 h-10 rounded-lg border border-red-200 text-sm font-semibold text-red-600 bg-red-50">停止发布</button>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-[1220px] mx-auto space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-black text-gray-900">{title || '2024 新政深研'}</h3>
              <span className="px-2 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">进行中</span>
            </div>
            <div className="mt-2 text-sm text-gray-500 flex items-center gap-5">
              <span>创建于: 2024-01-15</span>
              <span>奖励积分: 500</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-xl border border-gray-200 bg-white p-5"><p className="text-sm text-gray-500">累计学习人数</p><p className="mt-2 text-3xl font-black text-gray-900">12,840</p></div>
            <div className="rounded-xl border border-gray-200 bg-white p-5"><p className="text-sm text-gray-500">累计总浏览量</p><p className="mt-2 text-3xl font-black text-gray-900">45,291</p></div>
            <div className="rounded-xl border border-gray-200 bg-white p-5"><p className="text-sm text-gray-500">平均完成率</p><p className="mt-2 text-3xl font-black text-gray-900">86.5%</p></div>
          </div>
          <section className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="h-12 px-5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <h4 className="text-sm font-bold text-gray-900">资料配置预览</h4>
              <button className="text-sm text-blue-600 font-semibold">预览全文</button>
            </div>
            <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="aspect-video rounded-lg bg-gray-100 border border-gray-200 overflow-hidden">
                <img src="https://picsum.photos/seed/learning_detail/960/540" alt="学习资料封面" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">资料简介</p>
                  <p className="mt-2 text-sm text-gray-700 leading-7">本资料用于解读行业政策调整，重点覆盖税务合规、数据安全和劳务用工等关键变更，帮助业务团队快速识别风险并掌握执行策略。</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-600">#2024新政</span>
                  <span className="px-3 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-600">#合规培训</span>
                  <span className="px-3 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-600">#必修课程</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState<'activity' | 'activity-detail' | 'create' | 'learning' | 'learning-detail' | 'learning-create' | 'shop' | 'shop-add-product' | 'shop-add-activity' | 'tag-list' | 'tags' | 'strategy' | 'strategy-config' | 'employees' | 'permissions' | 'stats' | 'monitor' | 'finance' | 'tenant-detail' | 'create-tenant' | 'tenants'>('tenants');
  const [selectedActivityId, setSelectedActivityId] = useState('ACT-20231101-01');
  const [selectedLearningTitle, setSelectedLearningTitle] = useState('2024 新政深研');
  const [statsRole, setStatsRole] = useState<'platform' | 'company' | 'staff'>('platform');
  const [tenants, setTenants] = useState<PTenant[]>([]);
  const [employees, setEmployees] = useState<PEmployee[]>([]);
  const [mallProducts, setMallProducts] = useState<PMallProduct[]>([]);
  const [mallActivities, setMallActivities] = useState<PMallActivity[]>([]);
  const [liveActivities, setLiveActivities] = useState<PActivity[]>([]);
  const [liveCourses, setLiveCourses] = useState<PLearningCourse[]>([]);
  const [reconciliationReports, setReconciliationReports] = useState<PReconciliationReport[]>([]);
  const [stats, setStats] = useState<PStatsOverview | null>(null);
  const [permissionsData, setPermissionsData] = useState<PPermissionMatrix | null>(null);
  const [liveError, setLiveError] = useState('');
  const track = (event: string, properties: Record<string, unknown> = {}) => {
    trackEvent({ event, properties }).catch(() => undefined);
  };

  useEffect(() => {
    let disposed = false;
    (async () => {
      try {
        const [tenantRes, statsRes, permissionsRes, activitiesRes, coursesRes, employeesRes, mallProductsRes, mallActivitiesRes] = await Promise.all([
          pApi.tenants(),
          pApi.stats(),
          pApi.permissions(),
          pApi.activities(),
          pApi.learningCourses(),
          pApi.employees(),
          pApi.mallProducts(),
          pApi.mallActivities(),
        ]);
        if (disposed) return;
        setTenants(tenantRes.list || []);
        setStats(statsRes || null);
        setPermissionsData(permissionsRes || null);
        setLiveActivities(activitiesRes.activities || []);
        setLiveCourses(coursesRes.courses || []);
        setEmployees(employeesRes.list || []);
        setMallProducts(mallProductsRes.list || []);
        setMallActivities(mallActivitiesRes.list || []);
        setLiveError('');
      } catch (err: any) {
        if (disposed) return;
        setLiveError(err?.message || '实时数据加载失败');
      }
    })();
    return () => {
      disposed = true;
    };
  }, []);

  useEffect(() => {
    track('p_page_view', { view: currentView });
  }, [currentView]);

  const activityRows = liveActivities.length
    ? liveActivities.map((row, idx) => ({
        id: `ACT-${String(row.id).padStart(4, '0')}`,
        name: row.title,
        type:
          row.category === 'sign'
            ? '签到任务'
            : row.category === 'competition'
              ? '互动竞赛'
              : row.category === 'invite'
                ? '邀请任务'
                : '通用任务',
        version: `v1.${idx + 1}.0`,
        status: row.canComplete === false ? 'offline' : 'online',
        updateTime: row.completed ? '今日已完成' : '今日可参与',
        icon:
          row.category === 'competition' ? <HelpCircle size={20} /> : row.category === 'invite' ? <Send size={20} /> : <FileText size={20} />,
        iconBg: row.category === 'competition' ? 'bg-orange-100' : row.category === 'invite' ? 'bg-purple-100' : 'bg-blue-100',
        iconColor: row.category === 'competition' ? 'text-orange-600' : row.category === 'invite' ? 'text-purple-600' : 'text-blue-600',
      }))
    : defaultActivities;

  const learningList = liveCourses.length
    ? liveCourses.map((course, idx) => ({
        title: course.title,
        status: String(course.status || 'published') === 'draft' ? '草稿' : '已发布',
        type: String(course.contentType || 'video') === 'article' ? '文章' : '视频',
        duration: `${10 + idx}:2${idx}`,
        category: course.category || '通用培训',
        difficulty: String(course.level || '中级'),
        tags: [course.category || '学习', `积分${course.points}`],
        image: `https://picsum.photos/seed/course_${course.id}/600/400`,
      }))
    : materials;

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      <Sidebar currentView={currentView} onViewChange={(v) => setCurrentView(v as any)} />
      {currentView === 'activity' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-8 pt-3">
            <div className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs text-gray-600 flex items-center justify-between">
              <span>
                实时数据: 租户 {tenants.length} · 角色 {(permissionsData?.roles || []).length} · 权限 {(permissionsData?.permissions || []).length}
              </span>
              <span className={liveError ? 'text-red-500' : 'text-emerald-600'}>{liveError ? '连接异常' : '已连接 API'}</span>
            </div>
            {stats?.latest?.metrics && (
              <div className="mt-2 rounded-lg border border-blue-100 bg-blue-50 px-4 py-2 text-xs text-blue-700">
                今日指标: 客户 {stats.latest.metrics.customers || 0} · 活跃 {stats.latest.metrics.activeCustomers || 0} · 支付订单 {stats.latest.metrics.paidOrders || 0}
              </div>
            )}
          </div>
          <Header />
          <MainContent
            onCreateClick={() => setCurrentView('create')}
            onOpenDetail={(id) => {
              setSelectedActivityId(id);
              setCurrentView('activity-detail');
            }}
            activityRows={activityRows}
          />
        </div>
      )}
      {currentView === 'activity-detail' && (
        <ActivityDetailPage onBack={() => setCurrentView('activity')} activityId={selectedActivityId} />
      )}
      {currentView === 'tenants' && (
        <TenantListPage
          tenants={tenants}
          onCreate={() => setCurrentView('create-tenant')}
          onOpenDetail={() => setCurrentView('tenant-detail')}
        />
      )}
      {currentView === 'tenant-detail' && (
        <TenantDetailPage onBack={() => setCurrentView('tenants')} />
      )}
      {currentView === 'create-tenant' && (
        <CreateTenantPage
          onCancel={() => setCurrentView('tenants')}
          onCreate={async (payload) => {
            const created = await pApi.createTenant(payload);
            setTenants((prev) => [created.tenant, ...prev]);
            setCurrentView('tenants');
          }}
        />
      )}
      {currentView === 'create' && (
        <CreateActivity onBack={() => setCurrentView('activity')} />
      )}
      {currentView === 'learning' && (
        <LearningMaterials
          onCreate={() => setCurrentView('learning-create')}
          onOpenDetail={(title) => {
            setSelectedLearningTitle(title);
            setCurrentView('learning-detail');
          }}
          list={learningList}
        />
      )}
      {currentView === 'learning-detail' && (
        <LearningDetailViewPage onBack={() => setCurrentView('learning')} title={selectedLearningTitle} />
      )}
      {currentView === 'learning-create' && (
        <CreateLearningMaterial onBack={() => setCurrentView('learning')} />
      )}
      {currentView === 'shop' && (
        <MallManagementPage
          onAddProduct={() => setCurrentView('shop-add-product')}
          onAddActivity={() => setCurrentView('shop-add-activity')}
          products={mallProducts}
          activities={mallActivities}
        />
      )}
      {currentView === 'shop-add-product' && (
        <AddMallProductPage
          onBack={() => setCurrentView('shop')}
          onSubmit={async (payload) => {
            const result = await pApi.createMallProduct(payload);
            setMallProducts((prev) => [result.product, ...prev]);
            setCurrentView('shop');
          }}
        />
      )}
      {currentView === 'shop-add-activity' && (
        <AddMallActivityPage
          onBack={() => setCurrentView('shop')}
          onSubmit={async (payload) => {
            const result = await pApi.createMallActivity(payload);
            setMallActivities((prev) => [result.activity, ...prev]);
            setCurrentView('shop');
          }}
        />
      )}
      {currentView === 'tag-list' && (
        <LabelListPage />
      )}
      {currentView === 'tags' && (
        <TagRules />
      )}
      {currentView === 'strategy' && (
        <StrategyListPage onCreate={() => setCurrentView('strategy-config')} />
      )}
      {currentView === 'strategy-config' && (
        <StrategyCanvasPage onBack={() => setCurrentView('strategy')} />
      )}
      {currentView === 'employees' && (
        <EmployeeManagement
          employees={employees}
          onCreateEmployee={async (payload) => {
            const result = await pApi.createEmployee(payload);
            setEmployees((prev) => [result.employee, ...prev]);
          }}
        />
      )}
      {currentView === 'permissions' && (
        <PermissionsManagement />
      )}
      {currentView === 'stats' && (
        <StatsDashboardPage
          statsRole={statsRole}
          setStatsRole={setStatsRole}
          tenants={tenants}
          stats={stats}
          onRebuild={async () => {
            try {
              await pApi.rebuildStats();
              const next = await pApi.stats();
              setStats(next);
            } catch {}
          }}
        />
      )}
      {currentView === 'monitor' && (
        <MonitorScreenPage />
      )}
      {currentView === 'finance' && (
        <FinanceReconcilePage
          reports={reconciliationReports}
          onRun={async () => {
            const result = await pApi.runReconciliation();
            setReconciliationReports((prev) => [result.report, ...prev]);
          }}
        />
      )}
    </div>
  );
}

const PermissionsManagement = () => {
  const [activeRole, setActiveRole] = useState<'admin' | 'user'>('admin');
  const [activeCompany, setActiveCompany] = useState('T-001');

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      {/* Top Header */}
      <header className="h-16 border-b border-gray-200 bg-white px-8 flex items-center justify-between shrink-0">
        <h2 className="text-xl font-bold text-gray-900">权限分配</h2>
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <Bell size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <HelpCircle size={20} />
          </button>
        </div>
      </header>

      {/* Inner Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Searchable Company List */}
        <aside className="w-80 flex-shrink-0 flex flex-col border-r border-gray-200 bg-gray-50/50">
          <div className="p-4">
            <p className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">公司列表</p>
            <div className="relative mb-4">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="搜索公司..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600/50 outline-none transition-all"
              />
            </div>
            <div className="space-y-3 overflow-y-auto">
              {companies.map((company) => (
                <div 
                  key={company.id}
                  onClick={() => setActiveCompany(company.id)}
                  className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                    activeCompany === company.id 
                      ? 'bg-white border-2 border-blue-600 shadow-sm' 
                      : 'bg-white border border-gray-200 hover:border-blue-600/50'
                  }`}
                >
                  <div className="min-w-0">
                    <h4 className={`text-sm truncate ${activeCompany === company.id ? 'font-bold text-gray-900' : 'font-medium text-gray-900'}`}>
                      {company.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">{company.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-full">
                      {company.users}
                    </span>
                    {activeCompany === company.id && (
                      <ChevronRight size={16} className="text-blue-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Column: Workspace (Permission Matrix) */}
        <section className="flex-1 flex flex-col bg-white overflow-hidden">
          {/* Matrix Header */}
          <div className="border-b border-gray-200 bg-white shrink-0">
            <div className="p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">权限配置矩阵</h3>
                <p className="text-sm text-gray-500 mt-1">
                  正在编辑: {companies.find(c => c.id === activeCompany)?.name}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors cursor-pointer">
                  <History size={16} />
                  重置为默认
                </button>
                <button className="px-6 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-sm shadow-blue-600/20 transition-all cursor-pointer">
                  <Save size={16} />
                  保存更改
                </button>
              </div>
            </div>
            
            <div className="flex border-t border-gray-100 px-6 py-2">
              <div className="flex p-1 bg-gray-50 rounded-lg w-fit">
                <button 
                  onClick={() => setActiveRole('admin')}
                  className={`flex items-center gap-2 px-6 py-2 text-sm rounded-md transition-all cursor-pointer ${
                    activeRole === 'admin' 
                      ? 'font-bold bg-white shadow-sm text-blue-600' 
                      : 'font-medium text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Shield size={16} />
                  公司管理员
                </button>
                <button 
                  onClick={() => setActiveRole('user')}
                  className={`flex items-center gap-2 px-6 py-2 text-sm rounded-md transition-all cursor-pointer ${
                    activeRole === 'user' 
                      ? 'font-bold bg-white shadow-sm text-blue-600' 
                      : 'font-medium text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <User size={16} />
                  个人用户
                </button>
              </div>
            </div>
          </div>

          {/* Matrix Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-6 py-4 shrink-0">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
                <Info size={20} className="text-blue-500 shrink-0" />
                <p className="text-sm text-blue-700 leading-relaxed">
                  此处设置的权限将决定该租户类型可访问的页面及其功能操作权限。所有更改在保存后立即对该类型用户生效。
                </p>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto px-6 pb-6">
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full border-collapse bg-white">
                  <thead>
                    <tr className="text-left bg-gray-50 border-b border-gray-200">
                      <th className="py-4 px-6 text-sm font-bold text-gray-700">功能模块</th>
                      <th className="py-4 px-6 text-sm font-bold text-gray-700 text-center">页面访问</th>
                      <th className="py-4 px-6 text-sm font-bold text-gray-700 text-center">查看</th>
                      <th className="py-4 px-6 text-sm font-bold text-gray-700 text-center">编辑</th>
                      <th className="py-4 px-6 text-sm font-bold text-gray-700 text-center">删除</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {permissionModules.map((module, mIdx) => (
                      <React.Fragment key={mIdx}>
                        <tr className="bg-gray-50/50">
                          <td className="py-3 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider" colSpan={5}>
                            {module.group}
                          </td>
                        </tr>
                        {module.items.map((item, iIdx) => (
                          <tr key={iIdx} className="hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-6 text-sm font-medium text-gray-900">{item.name}</td>
                            <td className="py-4 px-6 text-center">
                              <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-600 cursor-pointer border-gray-300" defaultChecked={item.access} />
                            </td>
                            <td className="py-4 px-6 text-center">
                              <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-600 cursor-pointer border-gray-300" defaultChecked={item.view} />
                            </td>
                            <td className="py-4 px-6 text-center">
                              <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-600 cursor-pointer border-gray-300" defaultChecked={item.edit} />
                            </td>
                            <td className="py-4 px-6 text-center">
                              <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-600 cursor-pointer border-gray-300" defaultChecked={item.delete} />
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const companies = [
  { id: 'T-001', name: '锐思科技有限公司', users: '10/10' },
  { id: 'T-002', name: '华创数字营销', users: '10/10' },
  { id: 'T-004', name: '盛达集团', users: '10/10' },
  { id: 'T-006', name: '明日科技', users: '10/10' },
  { id: 'T-008', name: '新世纪传媒', users: '10/10' }
];

const permissionModules = [
  {
    group: '租户管理',
    items: [
      { name: '租户列表', access: true, view: true, edit: true, delete: false },
      { name: '创建租户', access: true, view: true, edit: true, delete: false },
      { name: '员工管理', access: true, view: true, edit: true, delete: true }
    ]
  },
  {
    group: '内容与营销',
    items: [
      { name: '活动中心', access: true, view: true, edit: false, delete: false },
      { name: '学习资料', access: true, view: true, edit: false, delete: false },
      { name: '积分商城', access: true, view: true, edit: false, delete: false }
    ]
  },
  {
    group: '营销策略',
    items: [
      { name: '标签规则库', access: true, view: true, edit: true, delete: false },
      { name: '营销策略', access: true, view: true, edit: true, delete: false }
    ]
  }
];

const EmployeeManagement = ({
  employees,
  onCreateEmployee,
}: {
  employees: PEmployee[];
  onCreateEmployee: (payload: { name: string; email: string; role: string }) => Promise<void>;
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('salesperson');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 relative">
      {/* Header section */}
      <header className="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-10 shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">员工管理</h2>
            <p className="text-gray-500 text-sm mt-1">管理您的团队成员及其组织访问权限</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm font-medium hover:bg-gray-50 transition-all cursor-pointer">
              <Filter size={16} />
              筛选
            </button>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm shadow-blue-600/20 hover:bg-blue-700 transition-all cursor-pointer"
            >
              <UserPlus size={16} />
              添加员工
            </button>
          </div>
        </div>
      </header>

      {/* Content Container */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-500">总员工数</p>
            <p className="text-3xl font-black mt-1 text-gray-900 tracking-tight">{employees.length || 0}</p>
            <div className="mt-4 flex items-center text-xs text-green-600 font-medium">
              <TrendingUp size={14} className="mr-1" /> 本月 +4
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-500">激活角色数</p>
            <p className="text-3xl font-black mt-1 text-gray-900 tracking-tight">{new Set(employees.map((e) => e.role || 'salesperson')).size || 0}</p>
            <div className="mt-4 flex items-center text-xs text-gray-500 font-medium">
              <ShieldAlert size={14} className="mr-1" /> 系统定义
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-500">待处理邀请</p>
            <p className="text-3xl font-black mt-1 text-gray-900 tracking-tight">{employees.filter((e) => (e.status || '').includes('invite')).length}</p>
            <div className="mt-4 flex items-center text-xs text-amber-600 font-medium">
              <Clock size={14} className="mr-1" /> 即将过期
            </div>
          </div>
        </div>

        {/* Employee Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">模块</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">查看</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">创建</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">编辑</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(employees.length
                  ? employees
                  : [{ id: 1, name: '默认业务员', role: 'salesperson', status: 'active', lastActiveAt: '2026-02-25 10:30' }]
                ).map((row: any) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{row.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                        {row.role === 'manager' ? '经理' : row.role === 'support' ? '技术支持' : '业务员'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${(row.status || '').includes('invite') ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${(row.status || '').includes('invite') ? 'bg-amber-600' : 'bg-green-600'}`}></span>
                        {(row.status || '').includes('invite') ? '已邀请' : '在线'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{row.lastActiveAt ? String(row.lastActiveAt).slice(0, 16).replace('T', ' ') : '无'}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-blue-600 transition-colors cursor-pointer">
                        <MoreHorizontal size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Role-Based Access Control Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">基于角色的权限控制</h3>
              <p className="text-sm text-gray-500 mt-1">配置现有角色的全局权限矩阵</p>
            </div>
            <div className="flex bg-gray-200 p-1 rounded-lg">
              <button className="px-4 py-1.5 text-xs font-bold bg-white rounded-md shadow-sm cursor-pointer">经理</button>
              <button className="px-4 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">业务员</button>
              <button className="px-4 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">技术支持</button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700">正在编辑权限: <span className="text-blue-600 font-bold uppercase ml-1">经理</span></span>
              <button className="text-blue-600 text-sm font-bold hover:underline cursor-pointer">重置为默认</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">模块</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-center">查看</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-center">创建</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-center">编辑</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-center">删除</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-sm text-gray-900">客户管理</td>
                    <td className="px-6 py-4 text-center">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-600 cursor-pointer" defaultChecked />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-600 cursor-pointer" defaultChecked />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-600 cursor-pointer" defaultChecked />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-600 cursor-pointer" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-sm text-gray-900">保单签发</td>
                    <td className="px-6 py-4 text-center">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-600 cursor-pointer" defaultChecked />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-600 cursor-pointer" defaultChecked />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-600 cursor-pointer" defaultChecked />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-600 cursor-pointer" />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-sm text-gray-900">账单与支付</td>
                    <td className="px-6 py-4 text-center">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-600 cursor-pointer" defaultChecked />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-600 cursor-pointer" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-600 cursor-pointer" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-600 cursor-pointer" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-end">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700 transition-all cursor-pointer">
                保存权限矩阵
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Employee Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">添加新员工</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">姓名</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all" 
                  placeholder="例如: 张三" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">工作邮箱</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all" 
                  placeholder="robert@company.com" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">分配角色</label>
                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none appearance-none transition-all cursor-pointer"
                  >
                    <option value="">选择一个角色...</option>
                    <option value="manager">经理</option>
                    <option value="salesperson">业务员</option>
                    <option value="support">技术支持</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
              {submitError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">{submitError}</div>
              )}
              
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <Info size={20} className="text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 leading-relaxed">
                  员工将收到一封邀请邮件来设置密码。他们的访问权限将根据分配的角色进行限制。
                </p>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="px-5 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                取消
              </button>
              <button
                disabled={submitting}
                onClick={async () => {
                  const payload = { name: name.trim(), email: email.trim(), role: role || 'salesperson' };
                  if (!payload.name || !payload.email) {
                    setSubmitError('请输入姓名和工作邮箱');
                    return;
                  }
                  try {
                    setSubmitting(true);
                    setSubmitError('');
                    await onCreateEmployee(payload);
                    setIsAddModalOpen(false);
                    setName('');
                    setEmail('');
                    setRole('salesperson');
                  } catch (err: any) {
                    setSubmitError(err?.message || '邀请失败');
                  } finally {
                    setSubmitting(false);
                  }
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm shadow-blue-600/20 hover:bg-blue-700 transition-all cursor-pointer disabled:opacity-60"
              >
                {submitting ? '发送中...' : '发送邀请'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TagRules = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 relative">
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-900">标签规则库</h2>
          <span className="text-gray-300">|</span>
          <nav className="flex text-sm">
            <ol className="flex items-center gap-2 text-gray-500">
              <li>营销策略</li>
              <ChevronRight size={14} />
              <li className="text-blue-600 font-medium">标签规则库</li>
            </ol>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer">
            <Bell size={20} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer">
            <HelpCircle size={20} />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">总规则数</p>
              <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                <Database size={20} />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-bold text-gray-900 leading-none">1,284</h3>
              <span className="text-green-600 text-xs font-bold mb-1 flex items-center gap-1">
                <TrendingUp size={12} /> 12%
              </span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">较上月新增 142 条规则</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">今日生效中</p>
              <div className="bg-green-50 p-2 rounded-lg text-green-600">
                <Verified size={20} />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-bold text-gray-900 leading-none">856</h3>
              <span className="text-green-600 text-xs font-bold mb-1 flex items-center gap-1">
                <TrendingUp size={12} /> 5%
              </span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">占规则总数的 66.7%</p>
          </div>
        </div>

        {/* Table Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="搜索规则名称、编码或创建人" 
              className="block w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm transition-all outline-none"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold cursor-pointer">
              <Filter size={18} />
              筛选
            </button>
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-bold shadow-md shadow-blue-600/20 cursor-pointer"
            >
              <Plus size={18} />
              新建规则
            </button>
          </div>
        </div>

        {/* Main Data Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">规则名称</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">生效状态</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">优先级</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">创建时间</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tagRules.map((rule, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">{rule.name}</span>
                        <span className="text-xs text-gray-500 mt-0.5">{rule.code}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked={rule.active} readOnly />
                          <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                        </div>
                        <span className={`text-xs font-medium ${rule.active ? 'text-gray-600' : 'text-gray-400'}`}>
                          {rule.active ? '生效中' : '已禁用'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                        rule.priority === 'P0 - 最高' ? 'bg-red-100 text-red-700' :
                        rule.priority === 'P1 - 高级' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {rule.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{rule.createdAt}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-bold p-1 cursor-pointer transition-colors">编辑</button>
                        <button className="text-red-500 hover:text-red-600 text-sm font-bold p-1 cursor-pointer transition-colors">删除</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
            <p className="text-xs text-gray-500">显示 1 到 4 共 1284 条记录</p>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded border border-gray-200 hover:bg-white text-gray-400 disabled:opacity-50 cursor-not-allowed" disabled>
                <ChevronLeft size={16} />
              </button>
              <button className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-bold cursor-pointer">1</button>
              <button className="px-3 py-1 rounded border border-gray-200 hover:bg-white text-xs text-gray-600 cursor-pointer">2</button>
              <button className="px-3 py-1 rounded border border-gray-200 hover:bg-white text-xs text-gray-600 cursor-pointer">3</button>
              <span className="px-2 text-gray-400">...</span>
              <button className="px-3 py-1 rounded border border-gray-200 hover:bg-white text-xs text-gray-600 cursor-pointer">321</button>
              <button className="p-1 rounded border border-gray-200 hover:bg-white text-gray-500 cursor-pointer">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div 
          className="absolute inset-0 bg-black/20 z-10 transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Configuration Drawer */}
      <div className={`absolute inset-y-0 right-0 w-[500px] bg-white shadow-2xl border-l border-gray-200 flex flex-col z-20 transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">新建标签规则</h2>
            <p className="text-xs text-gray-500 mt-1">通过可视化逻辑定义自动化打标规则</p>
          </div>
          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Rule Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-gray-700">规则名称</label>
              <input 
                type="text" 
                className="w-full border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 px-3 py-2 outline-none transition-all" 
                placeholder="例如：新晋高频交易客户" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-gray-700">优先级</label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 px-3 py-2 appearance-none outline-none transition-all cursor-pointer">
                    <option>P0 (最高)</option>
                    <option>P1</option>
                    <option>P2</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-gray-700">运行频率</label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 px-3 py-2 appearance-none outline-none transition-all cursor-pointer">
                    <option>实时更新</option>
                    <option>每日零点</option>
                    <option>每小时</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Visual Logic Builder */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold flex items-center gap-2 text-gray-900">
              <span className="w-5 h-5 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-[10px]">1</span>
              规则逻辑配置
            </h3>
            
            <div className="space-y-4">
              {/* IF Block */}
              <div className="relative pl-6 before:absolute before:left-0 before:top-4 before:bottom-4 before:w-0.5 before:bg-blue-100">
                <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 relative">
                  <div className="absolute -left-3 top-2 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">IF 如果</div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <select className="border border-gray-200 bg-white rounded text-xs py-1.5 px-2 focus:ring-2 focus:ring-blue-600/20 outline-none cursor-pointer">
                        <option>客户属性</option>
                        <option>客户行为</option>
                      </select>
                      <select className="flex-1 border border-gray-200 bg-white rounded text-xs py-1.5 px-2 focus:ring-2 focus:ring-blue-600/20 outline-none cursor-pointer">
                        <option>注册城市</option>
                        <option>累积订单金额</option>
                        <option>会员等级</option>
                      </select>
                      <select className="w-24 border border-gray-200 bg-white rounded text-xs py-1.5 px-2 focus:ring-2 focus:ring-blue-600/20 outline-none cursor-pointer">
                        <option>等于</option>
                        <option>不等于</option>
                        <option>包含</option>
                      </select>
                      <input 
                        type="text" 
                        className="w-24 border border-gray-200 bg-white rounded text-xs py-1.5 px-2 focus:ring-2 focus:ring-blue-600/20 outline-none" 
                        defaultValue="上海" 
                      />
                      <button className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-4 py-1">
                      <div className="h-px flex-1 bg-blue-100"></div>
                      <span className="text-[10px] font-bold text-blue-600 uppercase">AND 且</span>
                      <div className="h-px flex-1 bg-blue-100"></div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <select className="border border-gray-200 bg-white rounded text-xs py-1.5 px-2 focus:ring-2 focus:ring-blue-600/20 outline-none cursor-pointer">
                        <option>客户行为</option>
                        <option>客户属性</option>
                      </select>
                      <select className="flex-1 border border-gray-200 bg-white rounded text-xs py-1.5 px-2 focus:ring-2 focus:ring-blue-600/20 outline-none cursor-pointer">
                        <option>支付订单</option>
                        <option>浏览商品</option>
                        <option>点击卡券</option>
                      </select>
                      <span className="text-xs text-gray-500 shrink-0">次数 ≥</span>
                      <input 
                        type="number" 
                        className="w-16 border border-gray-200 bg-white rounded text-xs py-1.5 px-2 focus:ring-2 focus:ring-blue-600/20 outline-none" 
                        defaultValue="3" 
                      />
                      <button className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <button className="mt-4 text-xs text-blue-600 font-medium flex items-center gap-1 hover:underline cursor-pointer">
                    <PlusCircle size={14} /> 添加条件组合
                  </button>
                </div>
              </div>

              {/* THEN Block */}
              <div className="relative pl-6">
                <div className="bg-emerald-50/50 border border-emerald-200 rounded-lg p-4 relative">
                  <div className="absolute -left-3 top-2 bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">THEN 则</div>
                  
                  <div className="flex items-center gap-3">
                    <select className="border border-gray-200 bg-white rounded text-xs py-1.5 px-2 focus:ring-2 focus:ring-emerald-500/20 outline-none cursor-pointer">
                      <option>打上标签</option>
                      <option>移除标签</option>
                    </select>
                    
                    <div className="flex-1 flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] flex items-center gap-1 font-medium">
                        高潜力活跃用户 
                        <X size={12} className="cursor-pointer hover:text-emerald-900" />
                      </span>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] flex items-center gap-1 font-medium">
                        华东区域 
                        <X size={12} className="cursor-pointer hover:text-emerald-900" />
                      </span>
                      <button className="px-2 py-1 border border-dashed border-emerald-300 text-emerald-600 rounded text-[10px] flex items-center gap-1 hover:bg-emerald-50 transition-colors cursor-pointer font-medium">
                        <Plus size={12} /> 选择标签
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scope Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold flex items-center gap-2 text-gray-900">
              <span className="w-5 h-5 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-[10px]">2</span>
              生效范围设置
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex gap-6 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="scope" className="text-blue-600 focus:ring-blue-600 cursor-pointer" defaultChecked />
                  <span className="text-xs font-medium text-gray-700">全部公司</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="scope" className="text-blue-600 focus:ring-blue-600 cursor-pointer" />
                  <span className="text-xs font-medium text-gray-700">特定租户/子公司</span>
                </label>
              </div>
              
              <div className="space-y-2 opacity-50 pointer-events-none">
                <label className="block text-[10px] text-gray-500 font-bold uppercase">选择生效租户</label>
                <div className="w-full h-10 border border-gray-200 bg-white rounded-lg flex items-center px-3 justify-between">
                  <span className="text-xs text-gray-400">选择一个或多个租户...</span>
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer text-gray-700"
          >
            取消
          </button>
          <button className="px-6 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all cursor-pointer">
            保存规则
          </button>
        </div>
      </div>
    </div>
  );
};

const tagRules = [
  {
    name: '高净值客户自动识别',
    code: 'TAG_HNW_001',
    active: true,
    priority: 'P0 - 最高',
    createdAt: '2023-11-20 14:30'
  },
  {
    name: '续保意向分值计算',
    code: 'TAG_RENEW_024',
    active: true,
    priority: 'P1 - 高级',
    createdAt: '2023-12-05 09:15'
  },
  {
    name: '沉睡客户唤醒模型',
    code: 'TAG_SLEEP_009',
    active: false,
    priority: 'P2 - 普通',
    createdAt: '2024-01-12 16:45'
  },
  {
    name: '家庭保单覆盖率标签',
    code: 'TAG_FAMILY_882',
    active: true,
    priority: 'P2 - 普通',
    createdAt: '2024-02-08 11:20'
  }
];

const LearningMaterials = ({
  onCreate,
  onOpenDetail,
  list,
}: {
  onCreate: () => void;
  onOpenDetail: (title: string) => void;
  list: typeof materials;
}) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-900">学习资料</h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative group">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="搜索资料名称、知识点..." 
              className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-blue-600/50 transition-all outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">张经理</p>
              <p className="text-[10px] text-gray-500">业务管理员</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center overflow-hidden">
              <img src="https://picsum.photos/seed/user2/100/100" alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        {/* Summary Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <BookOpen size={28} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">课程总数</p>
              <h3 className="text-2xl font-bold mt-0.5 text-gray-900">1,284 <span className="text-emerald-500 text-xs font-normal">+12%</span></h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
              <PlayCircle size={28} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">累计播放量</p>
              <h3 className="text-2xl font-bold mt-0.5 text-gray-900">85.2k <span className="text-emerald-500 text-xs font-normal">+5.4%</span></h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500">
              <Star size={28} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">平均评分</p>
              <h3 className="text-2xl font-bold mt-0.5 text-gray-900">4.8 <span className="text-emerald-500 text-xs font-normal">+0.2%</span></h3>
            </div>
          </div>
        </section>

        {/* Filter Controls */}
        <section className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">资料类型:</span>
            <button className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg font-medium cursor-pointer">全部</button>
            <button className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm rounded-lg font-medium transition-colors cursor-pointer">视频</button>
            <button className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm rounded-lg font-medium transition-colors cursor-pointer">文章</button>
          </div>
          <div className="h-8 w-px bg-gray-200 mx-2"></div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">难度分级:</span>
            <div className="relative">
              <select className="bg-gray-100 border-none rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-600/50 cursor-pointer pl-4 pr-8 py-1.5 appearance-none outline-none text-gray-700">
                <option>全部难度</option>
                <option>初级</option>
                <option>中级</option>
                <option>高级</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>
          <div className="h-8 w-px bg-gray-200 mx-2"></div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">资料分类:</span>
            <div className="relative">
              <select className="bg-gray-100 border-none rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-600/50 cursor-pointer pl-4 pr-8 py-1.5 appearance-none outline-none text-gray-700">
                <option>全部领域</option>
                <option>寿险产品</option>
                <option>财险产品</option>
                <option>理赔流程</option>
                <option>销售技巧</option>
                <option>合规培训</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onCreate}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <Upload size={16} />
              新增
            </button>
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer">
              <ListIcon size={20} />
            </button>
          </div>
        </section>

        {/* Material Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {list.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden group shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="relative aspect-video bg-gray-200 shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                
                <span className={`absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-1 rounded z-20 ${item.status === '已发布' ? 'bg-emerald-500' : 'bg-orange-500'}`}>
                  {item.status}
                </span>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  {item.type === '视频' ? (
                    <PlayCircle size={48} className="text-white drop-shadow-lg" />
                  ) : (
                    <FileText size={48} className="text-white drop-shadow-lg" />
                  )}
                </div>
                
                {item.type === '视频' ? (
                  <span className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded z-20">
                    {item.duration}
                  </span>
                ) : (
                  <span className="absolute bottom-2 right-2 bg-blue-600/80 text-white text-[10px] px-1.5 py-0.5 rounded font-bold z-20">
                    文章
                  </span>
                )}
              </div>
              
              <div className="p-4 space-y-3 flex-1 flex flex-col">
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-sm line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors text-gray-900">
                    {item.title}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded">
                    {item.difficulty}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-100 mt-auto">
                  <p className="text-[11px] text-gray-400 font-medium mb-1 flex items-center gap-1">
                    <Tag size={12} />
                    关联知识点
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] text-gray-500">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center border-t border-gray-100 p-2 gap-2 shrink-0">
                <button className="flex-1 py-1.5 hover:bg-gray-50 rounded text-xs font-semibold text-gray-600 transition-colors flex items-center justify-center gap-1 cursor-pointer">
                  <Edit size={14} />
                  编辑
                </button>
                <button onClick={() => onOpenDetail(item.title)} className="flex-1 py-1.5 hover:bg-gray-50 rounded text-xs font-semibold text-gray-600 transition-colors flex items-center justify-center gap-1 cursor-pointer">
                  <Eye size={14} />
                  详情
                </button>
                <button className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded transition-colors cursor-pointer">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Pagination */}
        <footer className="flex items-center justify-between pt-4 pb-8">
          <p className="text-xs text-gray-500">显示 1 到 12 项，共 1,284 项</p>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors text-gray-500 cursor-pointer">
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 rounded bg-blue-600 text-white text-xs font-bold cursor-pointer">1</button>
            <button className="w-8 h-8 rounded border border-gray-200 text-xs font-bold hover:bg-blue-50 text-gray-700 transition-colors cursor-pointer">2</button>
            <button className="w-8 h-8 rounded border border-gray-200 text-xs font-bold hover:bg-blue-50 text-gray-700 transition-colors cursor-pointer">3</button>
            <span className="px-1 text-gray-400">...</span>
            <button className="w-8 h-8 rounded border border-gray-200 text-xs font-bold hover:bg-blue-50 text-gray-700 transition-colors cursor-pointer">107</button>
            <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors text-gray-500 cursor-pointer">
              <ChevronRight size={16} />
            </button>
          </div>
        </footer>
      </div>
    </div>
);

function LearningMaterialDetailPage({ onBack, title }: { onBack: () => void; title: string }) {
  return (
  <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
    <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
          <ArrowLeft size={16} />
          返回学习资料
        </button>
        <h2 className="text-xl font-bold text-gray-900">学习资料详情</h2>
      </div>
      <div className="flex items-center gap-2">
        <button className="px-4 h-10 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700">编辑资料</button>
        <button className="px-4 h-10 rounded-lg border border-red-200 text-sm font-semibold text-red-600 bg-red-50">停止发布</button>
      </div>
    </header>
    <main className="flex-1 overflow-auto p-8">
      <div className="max-w-[1220px] mx-auto space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-black text-gray-900">{title || '2024 新政深研'}</h3>
            <span className="px-2 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">进行中</span>
          </div>
          <div className="mt-2 text-sm text-gray-500 flex items-center gap-5">
            <span>创建于: 2024-01-15</span>
            <span>奖励积分: 500</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-xl border border-gray-200 bg-white p-5"><p className="text-sm text-gray-500">累计学习人数</p><p className="mt-2 text-3xl font-black text-gray-900">12,840</p></div>
          <div className="rounded-xl border border-gray-200 bg-white p-5"><p className="text-sm text-gray-500">累计总浏览量</p><p className="mt-2 text-3xl font-black text-gray-900">45,291</p></div>
          <div className="rounded-xl border border-gray-200 bg-white p-5"><p className="text-sm text-gray-500">平均完成率</p><p className="mt-2 text-3xl font-black text-gray-900">86.5%</p></div>
        </div>
        <section className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <div className="h-12 px-5 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <h4 className="text-sm font-bold text-gray-900">资料配置预览</h4>
            <button className="text-sm text-blue-600 font-semibold">预览全文</button>
          </div>
          <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="aspect-video rounded-lg bg-gray-100 border border-gray-200 overflow-hidden">
              <img src="https://picsum.photos/seed/learning_detail/960/540" alt="学习资料封面" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">资料简介</p>
                <p className="mt-2 text-sm text-gray-700 leading-7">
                  本资料用于解读行业政策调整，重点覆盖税务合规、数据安全和劳务用工等关键变更，帮助业务团队快速识别风险并掌握执行策略。
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-600">#2024新政</span>
                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-600">#合规培训</span>
                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-600">#必修课程</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
  );
}
};

const CreateLearningMaterial = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors text-sm font-semibold"
          >
            <ArrowLeft size={18} />
            返回
          </button>
          <span className="text-gray-300">|</span>
          <h2 className="text-2xl font-bold text-gray-900">新增学习资料</h2>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <Bell size={18} />
          <HelpCircle size={18} />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 space-y-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <label className="block lg:col-span-2">
              <span className="text-sm font-bold text-gray-800">资料标题 <span className="text-red-500">*</span></span>
              <input
                className="mt-2 w-full h-12 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                placeholder="请输入学习资料标题，例如：2024家庭资产配置白皮书"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-gray-800">积分奖励 <span className="text-red-500">*</span></span>
              <div className="mt-2 h-12 rounded-xl border border-gray-200 bg-white flex items-center px-3">
                <div className="w-8 h-5 rounded-full bg-blue-600 relative mr-3">
                  <span className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white" />
                </div>
                <input className="flex-1 text-sm outline-none" placeholder="请输入学习完成后奖励积分" />
                <span className="text-xs text-gray-400 font-semibold">积分</span>
              </div>
            </label>
          </div>

          <section>
            <h3 className="text-sm font-bold text-gray-800">资料介绍 <span className="text-red-500">*</span></h3>
            <div className="mt-2 border border-gray-200 rounded-xl overflow-hidden">
              <div className="h-12 px-4 flex items-center gap-3 bg-gray-50 border-b border-gray-100 text-gray-600">
                <button className="font-black">B</button>
                <button className="italic font-semibold">I</button>
                <span className="h-4 w-px bg-gray-200"></span>
                <button><ListIcon size={16} /></button>
                <button><Link size={16} /></button>
                <button><ImageIcon size={16} /></button>
              </div>
              <textarea
                className="w-full min-h-48 p-4 text-sm outline-none resize-none"
                placeholder="请输入详细的资料介绍、学习目标和重点提示..."
              />
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold text-gray-800">资料上传 <span className="text-red-500">*</span></h3>
            <div className="mt-3 border-2 border-dashed border-blue-100 bg-blue-50/20 rounded-2xl min-h-64 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-white border border-gray-100 flex items-center justify-center mb-4 text-blue-600">
                <UploadCloud size={28} />
              </div>
              <p className="text-xl font-semibold text-gray-800">点击上传视频或图文素材</p>
              <p className="text-sm text-gray-400 mt-3">支持格式：MP4, PDF, PPT, PNG, JPG</p>
              <p className="text-sm text-gray-400 mt-1">单个文件不超过 500MB，视频建议 1080P 以内</p>
            </div>
          </section>
        </div>
      </main>

      <footer className="h-20 bg-white border-t border-gray-200 px-8 flex items-center justify-end gap-4 shrink-0">
        <button
          onClick={onBack}
          className="px-8 h-12 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50"
        >
          取消
        </button>
        <button className="px-8 h-12 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 flex items-center gap-2">
          <Upload size={16} />
          上传资料
        </button>
      </footer>
    </div>
  );
};

const materials = [
  {
    title: '2024 年度定期寿险新规深度解析与条款解读',
    status: '已发布',
    type: '视频',
    duration: '12:45',
    category: '寿险产品',
    difficulty: '初级',
    tags: ['条款分析', '理赔流程'],
    image: 'https://picsum.photos/seed/ins1/600/400'
  },
  {
    title: '高端医疗险销售话术与抗拒点处理手册',
    status: '草稿',
    type: '文章',
    category: '销售技巧',
    difficulty: '高级',
    tags: ['话术实战', '客户心理'],
    image: 'https://picsum.photos/seed/ins2/600/400'
  },
  {
    title: '企业团险方案定制与核心竞争优势',
    status: '已发布',
    type: '视频',
    duration: '08:20',
    category: '财险产品',
    difficulty: '中级',
    tags: ['团体险', '方案定制'],
    image: 'https://picsum.photos/seed/ins3/600/400'
  },
  {
    title: '合规执业：反洗钱与消费者权益保护要点',
    status: '已发布',
    type: '文章',
    category: '合规培训',
    difficulty: '初级',
    tags: ['合规管理', '风险控制'],
    image: 'https://picsum.photos/seed/ins4/600/400'
  }
];
