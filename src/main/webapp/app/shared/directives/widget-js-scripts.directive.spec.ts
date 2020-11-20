/*
 * Copyright 2012-2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { WidgetJsScriptsDirective } from './widget-js-scripts.directive';
import { TestBed } from '@angular/core/testing';
import { MockModule } from '../../mock/mock.module';

describe('WidgetJsScriptsDirective', () => {
  let directive: WidgetJsScriptsDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockModule],
      providers: [WidgetJsScriptsDirective]
    });

    directive = TestBed.inject(WidgetJsScriptsDirective);
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });
});