import mixpanel from 'mixpanel-browser';

mixpanel.init('7ccad1799a07276332848283f8f3ddbd');

const envCheck = process.env.NODE_ENV === 'production';

const actions = {
  identify: (id) => {
    if (envCheck) mixpanel.identify(id);
  },
  alias: (id) => {
    if (envCheck) mixpanel.alias(id);
  },
  track: (name, props) => {
    if (envCheck) mixpanel.track(name, props);
  },
  people: {
    set: (props) => {
      if (envCheck) mixpanel.people.set(props);
    },
  },
};

export default actions;
