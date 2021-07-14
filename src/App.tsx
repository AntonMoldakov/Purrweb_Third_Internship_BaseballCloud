import React, { useState } from 'react';
import Button from 'ui/Button';
import Input from 'ui/Input';

function App() {
  const [isLoading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 5000);
  return (
    <div>
      <Input type="email" name="email" title="Email" placeholder="Email">
        <i className="fas fa-user" />
      </Input>
      <Button isLoading={isLoading} title={'Sign In'} />
    </div>
  );
}

export default App;
