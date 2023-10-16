'use client';
import React from 'react';
import Select from 'react-select';
import useSWR from 'swr';

const fetchModels = () => fetch('/api/getModels').then((res) => res.json());

function ModelSelection() {
  const { data: models, isLoading } = useSWR('models', fetchModels);
  const { data: model, mutate: setModel } = useSWR('model', {
    fallbackData: 'text-davinci-003',
  });
  return (
    <div>
      <Select
        className='mt-4'
        data-testid='model-selection'
        isSearchable
        options={models?.modelOptions}
        isLoading={isLoading}
        menuPosition='fixed'
        defaultValue={model}
        placeholder={model}
        classNames={{
          control: () => 'bg-gray bg-gray-light',
        }}
        onChange={(e) => setModel(e.value)}
      />
    </div>
  );
}

export default ModelSelection;
