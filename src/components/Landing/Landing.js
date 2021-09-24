import React from 'react';
import TextInput from '../TextInput/TextInput.component';
import CharacterCount from '../CharacterCount/CharacterCount.component';
import Users from '../Users/Users.component';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../ErrorFallback/index.component';

export default function Landing() {
  return (
    <div data-testid={'test-users-landing'}>
      <h2>Add User</h2>
      <hr />
      <TextInput />
      <CharacterCount />
      <br />
      <br />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Users />
      </ErrorBoundary>
    </div>
  );
}
