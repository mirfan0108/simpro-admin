import Vue from "vue";
import VueRouter from "vue-router";
import BootstrapVue from 'bootstrap-vue'
import AppMain from "@/app/pages/MainPage.html";
// START PAGES
import DashboardPage from "@/app/pages/DashboardPage.html"
import AdministratorManagementPage from "@/app/pages/AdministratorManagement.html"
import MksManagementPage from "@/app/pages/MksManagement.html"
import MonitoringPage from "@/app/pages/MonitoringPage.html"
import ReportPage from "@/app/pages/ReportPage.html"
import LoginPage from "@/app/pages/LoginPage.html"
import AccountManagement from "@/app/pages/AccountManagement.html"
import FormMks from "@/app/pages/FormMks.html"
import ModifyMks from "@/app/pages/ModifyMks.html"
import ProfileMks from "@/app/pages/ProfileMks.html"
import ReportMks from "@/app/pages/ReportMks.html"
// END PAGES

Vue.use(BootstrapVue)
Vue.use(VueRouter);

import "bootstrap-vue/dist/bootstrap-vue.css";

const ROOT_PATH = "/";
import axios from 'axios'
import { Service } from "axios-middleware";
const service = new Service(axios);

service.register({
    async onRequest(config) {
      if (localStorage.getItem("__CSRF")) {
        let token = JSON.parse(localStorage.getItem("__CSRF"))
        config.headers.Authorization = `Bearer ${token.access_token}`;
      }
      return config;
    },
    onSync(promise) {
      return promise;
    },
    onResponse(response) {
      return response;
    }
});

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
          path: ROOT_PATH,
          component: {
            template: "<router-view></router-view>"
          },
          children: [
            {
              path: "",
              component: AppMain,
              children: [
                { 
                    path: "/", 
                    name: "dashboard.page", 
                    component: DashboardPage
                },
                { 
                  path: "administrator", 
                  name: "administrator.page", 
                  component: AdministratorManagementPage
                },
                {
                  path: "sales",
                  name: "sales.page",
                  component: MksManagementPage
                },
                {
                  path: "sales/form",
                  name: "sales.form.page",
                  component: FormMks
                },
                {
                  path: "sales/profile/:id",
                  name: 'sales.profile.page',
                  component: ProfileMks,
                  props: true,
                  children: [
                    {
                      path: '/',
                      name: 'sales.profile.report.page',
                      component: ReportMks
                    },
                    {
                      path: "modify",
                      name: "sales.modify.page",
                      component: ModifyMks,
                      props: true
                    },
                  ]
                },
                {
                  path: "monitoring-nasabah",
                  name: "monitoring.page",
                  component: MonitoringPage
                },
                {
                  path: "ReportPage",
                  name: "report.page",
                  component: ReportPage
                },
                {
                  path: "account-management",
                  name: "account.page",
                  component: AccountManagement
                }
              ]
            },
            {
              path: "login",
              name: "login",
              component: LoginPage
            }
          ]
        }
    ]
})
let page = {
  title: "Welcome",
  subtitle: "home"
};
router.beforeEach((to, from, next) => {
  if (to.name != 'login' && !localStorage.getItem('__CSRF')) next({ name: 'login' })
  else next()
})
let store = {
  state: {
    username: "Alexander Pierce",
    flag: 0,
    avatar: false
  }
};

var app = new Vue({
    el: "#app",
    router: router,
    mounted() {
      if(localStorage.getItem("__pr")) {
        let profile = JSON.parse(localStorage.getItem("__pr"))
        store.state.username = profile.first_name+" "+profile.last_name
        store.state.avatar = profile.avatar
        store.state.target = profile.target
        store.state.flag = profile.flag
      }
    },
    data() {
      return {
        state: store.state,
        image_url: process.env.AVATAR_URL,
        base_url: path => ROOT_PATH + "/" + (path || ""),
        asset: path => ROOT_PATH + "assets/" + path,
        page: page,
      };
    },
    
  });
