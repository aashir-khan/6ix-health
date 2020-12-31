import RadioGroup from '@material-ui/core/RadioGroup';
import React, { useEffect, useState } from 'react';
import { SDCSelectOption } from '../../../../../domain/sdcForm/SDCForm';
import { SDCFormResponse } from '../../../../../domain/sdcFormResponse/SDCFormResponse';
import SDCSingleSelectOption from './SDCSingleSelectOption';

interface SDCSingleSelectQuestionProps {
  formResponse: SDCFormResponse;
  sdcSelectOptions: SDCSelectOption[];
  defaultOption?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChangeValue: Function;
}

export default ({
  sdcSelectOptions,
  formResponse,
  defaultOption,
  onChangeValue,
}: SDCSingleSelectQuestionProps): JSX.Element => {
  const [value, updateValue] = useState('');

  useEffect(() => {
    if (defaultOption && value === '') {
      updateValue(defaultOption);
    }
  }, [defaultOption, value]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChange(e: any) {
    const selectedOptionId = sdcSelectOptions.find(
      (option) => option.text === e.target.value
    )?.optionId;
    onChangeValue(selectedOptionId);
    updateValue(e.target.value);
  }
  return (
    <div>
      <RadioGroup onChange={(e) => handleChange(e)} value={value}>
        {sdcSelectOptions.map((option) => {
          return (
            <SDCSingleSelectOption
              onChangeValue={onChangeValue}
              key={option.optionId}
              text={option.text}
              value={value}
              responseMode={option.responseMode}
              formResponse={formResponse}
              controlledQuestions={option.controlledQuestions}
            />
          );
        })}
      </RadioGroup>
    </div>
  );
};
