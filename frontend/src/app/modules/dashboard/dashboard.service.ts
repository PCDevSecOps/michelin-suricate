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

import { Injectable } from '@angular/core';
import {AbstractHttpService} from '../../shared/services/abstract-http.service';
import {HttpClient} from '@angular/common/http';
import {Project} from '../../shared/model/dto/Project';
import {Observable} from 'rxjs/Observable';
import {ProjectWidget} from '../../shared/model/dto/ProjectWidget';
import {map} from 'rxjs/operators/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class DashboardService extends AbstractHttpService {

  dashboardsSubject = new BehaviorSubject<Project[]>([]);

  constructor(private http: HttpClient) {
    super();
  }

  private updateSubject(project: Project) {
    const currentList = this.dashboardsSubject.getValue();
    const indexOfCurrentProject = currentList.findIndex(currentProject => currentProject.id === project.id);

    if (indexOfCurrentProject >= 0) {
      currentList.splice(indexOfCurrentProject, 1);
    }

    this.dashboardsSubject.next([...currentList, project]);
  }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(`${AbstractHttpService.BASE_URL}/${AbstractHttpService.PROJECT_URL}`).pipe(
      map(projects => {
        this.dashboardsSubject.next(projects);
        return projects;
      })
    );
  }

  getOneById(id: string): Observable<Project> {
    return this.http.get<Project>(`${AbstractHttpService.BASE_URL}/${AbstractHttpService.PROJECT_URL}/${id}`);
  }

  addProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${AbstractHttpService.BASE_URL}/${DashboardService.PROJECT_URL}`, project)
        .pipe(
          map(projectAdded => {
            this.updateSubject(projectAdded);
            return projectAdded;
          })
        );
  }

  addWidgetToProject(projectWidget: ProjectWidget): Observable<Project> {
    const url = `${AbstractHttpService.BASE_URL}/${AbstractHttpService.PROJECT_URL}/${projectWidget.projectId}`;

    return this.http.put<Project>(`${url}`, projectWidget);
  }

  addUserToProject(project: Project, username: string): Observable<Project> {
    return this.http.put<Project>(`${AbstractHttpService.BASE_URL}/${AbstractHttpService.PROJECT_URL}/${project.id}/users/`, username)
        .pipe(
            map(projectUpdated => {
              this.updateSubject(project);
              return projectUpdated;
            })
        );
  }

  deleteUserFromProject(project: Project, userId: number): Observable<Project> {
    return this.http.delete<Project>(`${AbstractHttpService.BASE_URL}/${AbstractHttpService.PROJECT_URL}/${project.id}/users/${userId}`)
        .pipe(
            map(projectUpdated => {
              this.updateSubject(project);
              return projectUpdated;
            })
        );
  }
}
