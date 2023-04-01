import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { StepIconProps } from '@mui/material/StepIcon';
import GradeIcon from '@mui/icons-material/Grade';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

import { useOnboardingContext } from 'contexts/OnboardingContext';
import { Welcome } from 'components/onboarding/Welcome';
import { AccountSelection } from 'components/settings/AccountSelection';
import { SetAccountLevelCpr } from 'components/settings/SetAccountLevelCpr';
import { OnboardingComplete } from 'components/onboarding/OnboardingComplete';
import { StepIconRoot, StepIconConnector } from 'components/onboarding/StepIcon';
import { FacebookLogin } from 'components/FacebookLogin';

import { useSetOnboarding, useSetBulkCprAndThreshold } from 'api';

interface OnboardingDialogProps {
  open: boolean;
  onClose: () => void;
}

enum OnboardingSteps {
  Welcome,
  Integrate,
  SelectAdAccount,
  SetCpr,
  Complete
}

const steps = [
  {
    id: OnboardingSteps.Welcome,
    label: 'Welcome',
    Component: Welcome
  },
  {
    id: OnboardingSteps.Integrate,
    label: 'Integrate with Facebook',
    Component: FacebookLogin
  },
  {
    id: OnboardingSteps.SelectAdAccount,
    label: 'Select Ad Accounts',
    Component: AccountSelection
  },
  {
    id: OnboardingSteps.SetCpr,
    label: 'Set Account-Level CPRs',
    Component: SetAccountLevelCpr
  },
  {
    id: OnboardingSteps.Complete,
    label: 'All Done!',
    Component: OnboardingComplete
  }
];

function StepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <GradeIcon className="h-5 w-5" />,
    2: <FacebookRoundedIcon className="h-5 w-5" />,
    3: <CheckBoxIcon className="h-5 w-5" />,
    4: <TrackChangesIcon className="h-5 w-5" />,
    5: <RocketLaunchIcon className="h-5 w-5" />,
  };

  return (
    <StepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </StepIconRoot>
  );
}

export const Onboarding = ({
  open = false,
  onClose
}: OnboardingDialogProps) => {
  const { mutate: setOnboardingStatus } = useSetOnboarding({
    onSuccess: () => {}
  });
  const { mutate: bulkUpdateCprAndThreshold } = useSetBulkCprAndThreshold({});
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    currentStep,
    setCurrentStep,
    selectedAccounts,
    globalCpr,
    globalThreshold,
    accountLevelCprOverrides
  } = useOnboardingContext();
  const isLastStep = currentStep === steps.length - 1;

  const handlePreviousClick = () => {
    setCurrentStep(prevStep => prevStep - 1);
  }

  const handleNextClick = () => {
    switch(steps[currentStep].id) {
      case(OnboardingSteps.SelectAdAccount):
        setOnboardingStatus({ isComplete: false, currentStep });
        break

      case(OnboardingSteps.SetCpr):
        const payload = selectedAccounts.map(({ id }) => {
          const { target, threshold } = accountLevelCprOverrides[id];

          return {
            id,
            target: parseFloat(target ?? globalCpr),
            threshold: parseInt(threshold ?? globalThreshold)
          }
        })

        bulkUpdateCprAndThreshold({
          id_type: 'ad_accounts',
          payload
        })
        setOnboardingStatus({ isComplete: false, currentStep });
        break

      case(OnboardingSteps.Complete):
        setOnboardingStatus({
          isComplete: true,
          currentStep,
          onSuccess: () => {
            searchParams.delete('onboarding');
            searchParams.delete('onboarding_step');
            setSearchParams(searchParams);
            setCurrentStep(0);
          }
        })
        break
      default:
        setOnboardingStatus({ isComplete: false, currentStep });
    }
    setCurrentStep(prevStep => prevStep + 1)
  }

  return (
    <Dialog
      open={ open }
      // onClose={ onClose }
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          height: '80vh'
        }
      }}
    >
      <DialogTitle>
        <Stepper
          alternativeLabel
          activeStep={currentStep}
          connector={<StepIconConnector />}
        >
          {steps.map(({ label }) => (
            <Step key={ label }>
              <StepLabel className='mt-0' StepIconComponent={StepIcon} sx={{ marginTop: 0 }}>
                { label }
              </StepLabel>
            </Step>
          ))}
      </Stepper>
      </DialogTitle>

      <Divider />

      <DialogContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {
          steps.map(({ label, Component }, idx) =>
            currentStep === idx && <Component key={ label } />
          )
        }
      </DialogContent>

      <Divider />

      <DialogActions>
        <Box
          display="flex"
          justifyContent={ currentStep === 0 ? 'flex-end' : 'space-between' }
          width="100%"
        >
          { currentStep !== 0 &&
            <Button
              className="disabled:pointer-events-none"
              onClick={handlePreviousClick}
            >
              Previous
            </Button>
          }
          <Button
            variant="contained"
            onClick={handleNextClick}
          >
            { isLastStep ? 'Finish' : 'Next' }
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}
