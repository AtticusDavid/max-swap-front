import { Component, ErrorInfo, ReactNode } from 'react';

import { RepeatIcon } from '@chakra-ui/icons';
import { Button, Stack, Text } from '@chakra-ui/react';

import { logger } from 'src/utils/logger';

import styles from './index.module.scss';

interface Props {
  children: ReactNode;
  FallbackComponent?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return this.props.FallbackComponent ? (
        this.props.FallbackComponent
      ) : (
        <div className={styles.container}>
          <Stack marginBottom={12}>
            <Text fontSize="2xl">Oops! Something went wrong 🚨</Text>
          </Stack>

          <Button
            variant="outline"
            colorScheme="blueGray"
            onClick={() => this.setState({ hasError: false })}
            leftIcon={<RepeatIcon />}>
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
