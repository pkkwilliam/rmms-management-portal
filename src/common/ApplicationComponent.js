import React, { Component } from "react";
import { RmmsPortalContext } from "../context/contextProvider";
import AppStateService from "../service/AppStateService";
import { GET_COMPANY } from "../service/service";
import ServiceExecutor from "../service/serviceExecutor";
import ApplicationContext from "./ApplicationContext";
import ApplicationStorage from "./ApplicationStorage";

export default class ApplicationComponent extends Component {
  state = {
    loading: false,
    modal: {
      body: "",
      header: "",
      show: false,
    },
    toasts: [],
  };

  static _appContext;
  static _appStateService;
  static _appStorage;
  static contextType = RmmsPortalContext;
  static _serviceExecutor;

  constructor() {
    super();
    this._appContext = new ApplicationContext();
    this._appStorage = new ApplicationStorage();
    this._serviceExecutor = new ServiceExecutor(
      this.appContext.host,
      this.appStorage
    );
  }

  async componentDidMount() {
    this.validateUserPermission();
    this.componentInitService();
    this.appStateService.getAppContent().catch((ex) => ex);
  }

  get appContext() {
    return this._appContext;
  }

  get appState() {
    return this.context;
  }

  get appStateService() {
    if (!this._appStateService) {
      this._appStateService = new AppStateService(
        this.appState,
        this.serviceExecutor
      );
    }
    return this._appStateService;
  }

  get appStorage() {
    return this._appStorage;
  }

  get serviceExecutor() {
    return this._serviceExecutor;
  }

  addToastMessage(toast) {
    this.setState((state) => ({
      toasts: state.toasts.concat(toast),
    }));
  }

  componentInitService() {
    console.debug(
      "componentInitService: please override this in the component if there is service request after parent componentDidMount()"
    );
  }

  getRouterProps() {
    return this?.props?.history?.location?.state ?? {};
  }

  goTo(page, params = {}, delay = 0) {
    setTimeout(() => {
      this.props.history.push({
        pathname: page,
        state: params,
      });
    }, delay);
  }

  onCloseErrorModal = () => {
    this.setState({
      modal: {},
    });
  };

  toggleLoading() {
    this.setState((state) => ({ loading: !state.loading }));
  }

  validateUserPermission() {
    const userToken = this.appStorage.getUserToken();
    if (!userToken) {
      this.props.history.push("/login");
    }
  }
}
