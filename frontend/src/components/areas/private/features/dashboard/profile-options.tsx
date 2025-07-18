import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useHistory } from 'react-router-dom';

import {
  Typography,
  Button,
  CardActions,
  CardContent
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { Alert, AlertTitle } from '@material-ui/lab';

import { Card, CardList, CardMedia } from '../../components/ProfileStyles';
import WelcomeUser from '../../components/session/welcome-user';

const organizationIcon = require('images/icons/noun_project management_3063542.svg');
const toolsIcon = require('images/icons/noun_project management_3063515.svg');
const preferencesIcon = require('images/icons/noun_project management_3063532.svg');
const generalSettingsIcon = require('images/icons/noun_project management_3063521.svg');
const taskIcon = require('images/icons/noun_project management_3063547.svg');
const configIcon = require('images/icons/noun_project management_3063514.svg');
const paymentsIcon = require('images/icons/noun_project management_3063535.svg');

const useStyles = makeStyles((theme) => ({
  cardActions: {
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardMedia: {
    height: 140,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  cardContent: {
    flexGrow: 1
  },
  cardList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: theme.spacing(2)
  }
}));

const ProfileOptions = ({ user }) => {
  const { data = {}, completed } = user;
  const { Types = [] } = data;

  const history = useHistory();
  const classes = useStyles();

  const [ visible , setVisible ] = React.useState(false)

  React.useEffect(() => {
    Types.length === 0 && setVisible(true);
  }, [Types]);

  return (
    <Fragment>
      {window.localStorage.getItem('firstLogin') === 'true' && <WelcomeUser />}
      {visible && (
        <div style={{ marginTop: 20 }}>
          <Alert
            severity="warning"
            action={
              <Button
                size="small"
                onClick={() => {
                  history.push('/profile/user-account/roles');
                }}
                variant="contained"
                color="secondary"
              >
                <FormattedMessage
                  id="account.profile.alert.button"
                  defaultMessage="Update your role"
                />
              </Button>
            }
          >
            <AlertTitle>
              <FormattedMessage
                id="account.profile.alert.title"
                defaultMessage="Update your role"
              />
            </AlertTitle>
            <FormattedMessage
              id="account.profile.alert.description"
              defaultMessage="You need to update your role to define your user type. Click on the button to update your role"
            />
          </Alert>
        </div>
      )}
      <div style={{ marginBottom: 40 }}>
        <CardList>
          {Types &&
            Types.map((t) => t.name).includes('contributor') && (
              <Card>
                <FormattedMessage
                  id="account.profile.issues.caption"
                  defaultMessage="Issues"
                >
                  {(msg) => <CardMedia image={taskIcon} title={msg} />}
                </FormattedMessage>
                <CardContent>
                  <Typography variant="h6">
                    <FormattedMessage
                      id="account.profile.issues.headline"
                      defaultMessage="Issues"
                    />
                  </Typography>
                  <Typography variant="body2">
                    <FormattedMessage
                      id="account.profile.issues.description"
                      defaultMessage="Check the issues available for you"
                    />
                  </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button size="small" color="primary">
                    <Link to={'/profile/tasks'}>
                      <FormattedMessage
                        id="account.profile.issues.link.tasks"
                        defaultMessage="See issues"
                      />
                    </Link>
                  </Button>
                </CardActions>
              </Card>
            )}
          {Types &&
            (Types.map((t) => t.name).includes('funding') ||
              Types.map((t) => t.name).includes('maintainer')) && (
              <Card>
                <FormattedMessage
                  id="account.profile.tasks.payments.caption"
                  defaultMessage="Payments"
                >
                  {(msg) => <CardMedia image={paymentsIcon} title={msg} />}
                </FormattedMessage>
                <CardContent>
                  <Typography variant="h6">
                    <FormattedMessage
                      id="account.profile.tasks.payment.paid.headline"
                      defaultMessage="Payments"
                    />
                  </Typography>
                  <Typography variant="body2">
                    <FormattedMessage
                      id="account.profile.tasks.payments.desc"
                      defaultMessage="Access all your payments to any issue on Gitpay"
                    />
                  </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button size="small" color="primary">
                    <Link to={'/profile/payments'}>
                      <FormattedMessage
                        id="account.profile.payments.setup"
                        defaultMessage="See your payments"
                      />
                    </Link>
                  </Button>
                </CardActions>
              </Card>
            )}
          {Types &&
            Types.map((t) => t.name).includes('contributor') && (
              <Card>
                <FormattedMessage
                  id="account.profile.tasks.payment.caption"
                  defaultMessage="Payment"
                >
                  {(msg) => <CardMedia image={toolsIcon} title={msg} />}
                </FormattedMessage>
                <CardContent>
                  <Typography variant="h6">
                    <FormattedMessage
                      id="account.profile.tasks.paid.headline"
                      defaultMessage="Bank account"
                    />
                  </Typography>
                  <Typography variant="body2">
                    <FormattedMessage
                      id="account.profile.tasks.bank.desc"
                      defaultMessage="Register your bank accounts"
                    />
                  </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button size="small" color="primary">
                    <Link to={'/profile/payout-settings'}>
                      <FormattedMessage
                        id="account.profile.tasks.account.setup"
                        defaultMessage="Setup bank account"
                      />
                    </Link>
                  </Button>
                </CardActions>
              </Card>
            )}
          {Types &&
            Types.map((t) => t.name).includes('contributor') && (
              <Card>
                <CardMedia
                  image={preferencesIcon}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography variant="h6">
                    <FormattedMessage
                      id="account.profile.preferences.headline"
                      defaultMessage="Preferences"
                    />
                  </Typography>
                  <Typography variant="body2">
                    <FormattedMessage
                      id="account.profile.preferences.description"
                      defaultMessage="Setup your preferences to receive matching offers"
                    />
                  </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button size="small" color="primary">
                    <Link to="/profile/user-account/skills">
                      <FormattedMessage
                        id="account.profile.preferences.link"
                        defaultMessage="Setup preferences"
                      />
                    </Link>
                  </Button>
                </CardActions>
              </Card>
            )}
          <Card>
            <CardMedia image={configIcon} title="Contemplative Reptile" />
            <CardContent>
              <Typography variant="h6">
                <FormattedMessage
                  id="account.profile.roles.headline"
                  defaultMessage="Roles"
                />
              </Typography>
              <Typography variant="body2">
                <FormattedMessage
                  id="account.profile.roles.description"
                  defaultMessage="Set your roles to define your capabilities on Gitpay"
                />
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Button size="small" color="primary">
                <Link to="/profile/user-account/roles">
                  <FormattedMessage
                    id="account.profile.roles.link"
                    defaultMessage="Setup your roles on Gitpay"
                  />
                </Link>
              </Button>
            </CardActions>
          </Card>
          <Card>
            <CardMedia
              image={generalSettingsIcon}
              title="General settings"
            />
            <CardContent>
              <Typography variant="h6">
                <FormattedMessage
                  id="account.profile.settings.headline"
                  defaultMessage="General settings"
                />
              </Typography>
              <Typography variant="body2">
                <FormattedMessage
                  id="account.profile.settings.description"
                  defaultMessage="Set your general settings on Gitpay to setups your account"
                />
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Button size="small" color="primary">
                <Link to="/profile/user-account/settings">
                  <FormattedMessage
                    id="account.profile.settings.link"
                    defaultMessage="Your general settings"
                  />
                </Link>
              </Button>
            </CardActions>
          </Card>
        </CardList>
      </div>
    </Fragment>
  );
};

export default ProfileOptions;
