/*
 * Copyright (c) Microsoft Corporation
 * All rights reserved.
 *
 * MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {
  Fabric,
  Stack,
  Text,
  DefaultButton,
  getTheme,
  FontSizes,
  FontWeights,
} from 'office-ui-fabric-react';
import uploadRoot from '../../assets/img/upload-root.svg';
import uploadHover from '../../assets/img/upload-hover.svg';
import singleRoot from '../../assets/img/single-root.svg';
import singleHover from '../../assets/img/single-hover.svg';
import distributeRoot from '../../assets/img/distribute-root.svg';
import distributeHover from '../../assets/img/distribute-hover.svg';

import {JobSubmissionPage} from './job-submission-page';
import Card from '../components/card';

const {spacing, palette} = getTheme();

const IconStyle = {
  root: {
    borderRadius: '100%',
    backgroundColor: 'white',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '30%',
    boxShadow: `rgba(0, 0, 0, 0.06) 0px 2px 4px, rgba(0, 0, 0, 0.05) 0px 0.5px 1px`,
    width: 300,
    height: 300,
  },
  hover: {
    borderRadius: '100%',
    backgroundColor: 'white',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '30%',
    borderColor: palette.themePrimary,
    borderWidth: 3,
    width: 300,
    height: 300,
  },
};

const JobWizard = () => {
  const [wizardStatus, setWizardStatus] = useState('wizard');

  return (
    <Fabric style={{height: '100%'}}>
      {wizardStatus === 'wizard' &&
        <Card style={{height: '90%', margin: `${spacing.l2}`}}>
          <Stack horizontalAlign='center' padding={100} gap={100}>
            <Text styles={{root: {color: palette.themePrimary, fontSize: FontSizes.xxLarge, fontWeight: FontWeights.semibold, alignItems: 'center', position: 'absolute'}}}>
              Select your job type
            </Text>
            <Stack
              horizontal
              horizontalAlign='center'
              gap={100}
              style={{width: '100%', marginTop: 100}}
            >
              <Stack horizontalAlign='center' gap={50}>
                <DefaultButton
                  styles={{
                    root: {
                      backgroundImage: `url(${uploadRoot})`,
                      ...IconStyle.root,
                    },
                    rootHovered: {
                      backgroundImage: `url(${uploadHover})`,
                      ...IconStyle.hover,
                    },
                  }}
                />
                <Text styles={{root: {fontSize: FontSizes.large, fontWeight: FontWeights.semibold}}}>
                  Import Config
                </Text>
              </Stack>
              <Stack horizontalAlign='center' gap={50}>
                <DefaultButton
                  styles={{
                    root: {
                      backgroundImage: `url(${singleRoot})`,
                      ...IconStyle.root,
                    },
                    rootHovered: {
                      backgroundImage: `url(${singleHover})`,
                      ...IconStyle.hover,
                    },
                  }}
                  onClick={() => {
                    setWizardStatus('single');
                  }}
                />
                <Text styles={{root: {fontSize: FontSizes.large, fontWeight: FontWeights.semibold}}}>
                  Single Job
                </Text>
              </Stack>
              <Stack horizontalAlign='center' gap={50}>
                <DefaultButton
                  styles={{
                    root: {
                      backgroundImage: `url(${distributeRoot})`,
                      ...IconStyle.root,
                    },
                    rootHovered: {
                      backgroundImage: `url(${distributeHover})`,
                      ...IconStyle.hover,
                    },
                  }}
                  onClick={() => {
                    setWizardStatus('general');
                  }}
                />
                <Text styles={{root: {fontSize: FontSizes.large, fontWeight: FontWeights.semibold}}}>
                  Distributed Job
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Card>
      }
      {wizardStatus === 'single' &&
        <JobSubmissionPage isSingle={true}/>
      }
      {wizardStatus === 'general' &&
        <JobSubmissionPage isSingle={false}/>
      }
    </Fabric>
  );
};

const contentWrapper = document.getElementById('content-wrapper');

document.getElementById('sidebar-menu--job-submission').classList.add('active');
ReactDOM.render(<JobWizard />, contentWrapper);

function layout() {
  setTimeout(function() {
    contentWrapper.style.height = contentWrapper.style.minHeight;
  }, 10);
}

window.addEventListener('resize', layout);
window.addEventListener('load', layout);
