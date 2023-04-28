
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { login, fbLogin, ggLogin } = useAuth();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit } = methods;

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error({ ...error });
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  

  const onGgLogin = async () => {
    try {
      await ggLogin();
    } catch (error) {
      console.error(error);
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Button
          fullWidth
          startIcon={<Iconify icon="akar-icons:google-fill" />}
          size="large"
          variant="contained"
          onClick={onGgLogin}
        >
          Đăng nhập bằng tài khoản Google
        </Button>
      </Stack>
    </FormProvider>
  );
}
