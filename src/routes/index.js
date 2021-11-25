import AuthView from '../views/auth/AuthView';
import Governance from '../views/Governance';
import SmartYield from '../views/SmartYield';
import YieldFarming from '../views/YieldFarming';
import Dashboard from '../views/Dashboard';
import Vault from '../views/Vault';
import Swap from '../views/Swap';
import BurnVault from '../views/BurnVault';
import carbonStake from'../views/carbonStake';
import blackStake from '../views/blackStaking';
import lpStake from '../views/LpStaking';
import admin from '../components/global/admin'
import Adminviewdb from '../components/global/Adminviewdb'
import Dashboardduplicate from '../views/Dashboardduplicate'
import Fileupload from '../views/Fileupload';
import ApprovePage from '../components/global/ApprovePage';

let routes = [
	{
		path: '/auth',
		component: AuthView,
		layout: 'auth',
	},
	{
		path: '/createkyc',
		name: 'Dashboard',
		component: Dashboard,
		layout: 'main',
	},
	{
		path: '/createdid',
		name: 'createdid',
		component: Vault,
		layout: 'main',
	},
	{
		path: '/viewdid',
		name: 'viewdid',
		component: Swap,
		layout: 'main',
	},
	{
		path: '/governance',
		name: 'Governance',
		component: Governance,
		layout: 'main',
	},
	{
		path: '/carbon-yield',
		name: 'Carbon Yield',
		component: SmartYield,
		layout: 'main',
	},
	{
		path: '/yield-farming',
		name: 'Yield Farming',
		component: YieldFarming,
		layout: 'main',
	},
	{
		path: '/burn-vault',
		name: 'Burn Vault',
		component: BurnVault,
		layout: 'main',
	},
	{
		path: '/carbon-stake',
		name: 'carbon stake',
		component: carbonStake,
		layout: 'main',
	},
	{
		path: '/black-stake',
		name: 'black stake',
		component: blackStake,
		layout: 'main',
	},
	{
		path: '/lp-stake',
		name: 'lp stake',
		component: lpStake,
		layout: 'main',
	},
	{
		path: '/admin',
		name: 'Admin',
		component: admin,
		layout: 'main',
	},	
	{
		path: '/dashboardd',
		name: 'dashboardd',
		component: Dashboardduplicate,
		layout: 'main',
	},	
	{
		path: '/fileupload',
		name: 'Fileupload',
		component: Fileupload,
		layout: 'main',
	},	
	{
		path: '/approvepage',
		name: 'ApprovePage',
		component: ApprovePage,
		layout: 'auth',
	},		
	{
		path: '/adminviewdb',
		name: 'adminviewdb',
		component: Adminviewdb,
		layout: 'auth',
	},
];
export default routes;
