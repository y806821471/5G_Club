import Vue from 'vue'
import Router from 'vue-router'

// 登录
import Login from '@/components/login/Login' //登录
import Register from '@/components/login/Register' //注册
import Forget from '@/components/login/Forget' //忘记密码

// 主页
import Home from '@/components/home/Home' //首页
import NoticeList from '@/components/home/NoticeList' //公告列表
import NoticeDetail from '@/components/home/NoticeDetail' //公告详情
import Recognition from '@/components/home/Recognition' //认筹
import Exchanged from '@/components/home/Exchanged' //互转
import Sharing from '@/components/home/Sharing' //分享

// 资产
import Myproperty from '@/components/property/Index' //首页index
import ExchangeYLB from '@/components/property/ExchangeYLB' //娱乐币兑换
import WithdrawYLB from '@/components/property/WithdrawYLB' //娱乐币提现
import TopUpYLB from '@/components/property/TopUpYLB' //娱乐币充值
import ConvertGQB from '@/components/property/ConvertGQB' //股权币转换  ExchangeYYB
import ExchangeYYB from '@/components/property/ExchangeYYB' //应用币币兑换 

// 应用
import Apply from '@/components/apply/Index' //应用
import ProjectApps from '@/components/apply/ProjectApps' //项目应用
import ProjectAppsDetails from '@/components/apply/ProjectAppsDetails' //项目应用详情
import MoneyApps from '@/components/apply/MoneyApps' //理财应用
import MyMoney from '@/components/apply/MyMoney' //我的理财
import ConsumeApps from '@/components/apply/ConsumeApps' //消费应用
import ConsumeAppsDetails from '@/components/apply/ConsumeAppsDetails' //消费应用详情
import BiBiApps from '@/components/apply/BiBiApps' //币币应用  
import BiBiAppsDetails from '@/components/apply/BiBiAppsDetails' //币币应用详情

// 我的
import Personal from '@/components/personal/Index' //我的index
import CustomerService from '@/components/personal/CustomerService' //客服中心
import Feedback from '@/components/personal/Feedback' //问题反馈
import FeedbackList from '@/components/personal/FeedbackList' //反馈列表
import Safety from '@/components/personal/Safety' //安全中心
import AddAlipay from '@/components/personal/AddAlipay' //添加支付宝账号    
import AddBank from '@/components/personal/AddBank' //添加银行卡
import SafetyPassword from '@/components/personal/SafetyPassword' //安全中心修改登录密码
import DealPassword from '@/components/personal/DealPassword' //安全中心修改交易密码
import MyTeam from '@/components/personal/MyTeam' //我的团队
import Financial from '@/components/personal/Financial' //财务明细

Vue.use(Router)

export default new Router({
  routes: [
    // 登陆注册
    { path: '/', name: 'home', redirect: "/Home" },
    { path: '/Login', name: 'Login', component: Login, },
    { path: '/Register', name: 'Register', component: Register, },
    { path: '/Forget', name: 'Forget', component: Forget, },

    // 主页
    { path: '/Home', name: 'Home', component: Home },
    { path: '/Recognition', name: 'Recognition', component: Recognition },
    { path: '/Exchanged', name: 'Exchanged', component: Exchanged },
    { path: '/Sharing', name: 'Sharing', component: Sharing },
    { path: '/NoticeList', name: 'NoticeList', component: NoticeList },
    { path: '/NoticeDetail', name: 'NoticeDetail', component: NoticeDetail },

    //资产
    { path: '/Myproperty', name: 'Myproperty', component: Myproperty },
    { path: '/ExchangeYLB', name: 'ExchangeYLB', component: ExchangeYLB },
    { path: '/WithdrawYLB', name: 'WithdrawYLB', component: WithdrawYLB },
    { path: '/ConvertGQB', name: 'ConvertGQB', component: ConvertGQB },
    { path: '/ExchangeYYB', name: 'ExchangeYYB', component: ExchangeYYB },
    { path: '/TopUpYLB', name: 'TopUpYLB', component: TopUpYLB },

    //应用
    { path: '/Apply', name: 'Apply', component: Apply }, //应用
    { path: '/ProjectApps', name: 'ProjectApps', component: ProjectApps }, //项目应用
    { path: '/ProjectAppsDetails', name: 'ProjectAppsDetails', component: ProjectAppsDetails }, //项目应用详情
    { path: '/MoneyApps', name: 'MoneyApps', component: MoneyApps }, //理财应用
    { path: '/MyMoney', name: 'MyMoney', component: MyMoney }, //我的理财
    { path: '/ConsumeApps', name: 'ConsumeApps', component: ConsumeApps }, //消费应用
    { path: '/ConsumeAppsDetails', name: 'ConsumeAppsDetails', component: ConsumeAppsDetails }, //消费应用详情
    { path: '/BiBiApps', name: 'BiBiApps', component: BiBiApps }, //币币应用
    { path: '/BiBiAppsDetails', name: 'BiBiAppsDetails', component: BiBiAppsDetails }, //币币应用详情

    // 我的
    { path: '/Personal', name: 'Personal', component: Personal },
    { path: '/CustomerService', name: 'CustomerService', component: CustomerService },
    { path: '/Feedback', name: 'Feedback', component: Feedback },
    { path: '/FeedbackList', name: 'FeedbackList', component: FeedbackList },
    { path: '/Safety', name: 'Safety', component: Safety },
    { path: '/AddAlipay', name: 'AddAlipay', component: AddAlipay },
    { path: '/AddBank', name: 'AddBank', component: AddBank },
    { path: '/SafetyPassword', name: 'SafetyPassword', component: SafetyPassword },
    { path: '/DealPassword', name: 'DealPassword', component: DealPassword },
    { path: '/MyTeam', name: 'MyTeam', component: MyTeam },
    { path: '/Financial', name: 'Financial', component: Financial },

  ]
})