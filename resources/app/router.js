import Vue from 'vue';
import Router from 'vue-router';
import store from './store.js';

import Home from './views/Home.vue';
import Login from '@/components/Auth/Login';
import Register from '@/components/Auth/Register';

import InvoiceList from '@/views/Invoice/List';
import CreateInvoice from '@/views/Invoice/Create';

import SettingsIndex from '@/views/Settings/Index';
import OrganisationDetails from '@/components/Settings/OrganisationDetails';
import InvoiceSettings from '@/components/Settings/InvoiceSettings';
import Currencies from '@/components/Settings/Currencies';
import TaxRates from '@/components/Settings/TaxRates';

import ContactList from '@/views/Contacts/List';
import CreateContact from '@/views/Contacts/Create';
import ContactDetail from '@/views/Contacts/Detail';

Vue.use(Router);

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/settings',
      component: SettingsIndex,
      children: [
        {
          path: 'organisation',
          name: 'organisationSettings',
          component: OrganisationDetails
        },
        {
          path: 'invoice',
          name: 'invoiceSettings',
          component: InvoiceSettings
        },
        {
          path: 'currencies',
          name: 'currencies',
          component: Currencies
        },
        {
          path: 'taxrates',
          name: 'taxrateSettings',
          component: TaxRates
          //component: () => import(/* webpackChunkName: "taxrateSettings" */ '@/components/Settings/TaxRates')
        }
      ]
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactList
    },
    {
      path: '/contacts/view/:pseudoId',
      name: 'contactDetail',
      component: ContactDetail
    },
    {
      path: '/contacts/create',
      name: 'createcontact',
      component: CreateContact
    },
    {
      path: '/invoices',
      name: 'invoices',
      component: InvoiceList
    },
    {
      path: '/invoices/create',
      name: 'createInvoice',
      component: CreateInvoice
      //component: () => import(/* webpackChunkName: "createInvoice" */ '@/views/Invoice/Create')
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;
