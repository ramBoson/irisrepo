import AuthView from '../views/auth/AuthView';
import Dashboard from '../views/Dashboard';
import Vault from '../views/Vault';
import Swap from '../views/Swap';
import admin from '../components/global/admin'
import Adminviewdb from '../components/global/Adminviewdb'
import Dashboardduplicate from '../views/Dashboardduplicate'
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
