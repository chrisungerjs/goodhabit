import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Instance = {
  __typename?: 'Instance';
  doesRepeat?: Maybe<Scalars['Boolean']>;
  customName?: Maybe<Scalars['String']>;
};

export type InstanceInput = {
  doesRepeat?: Maybe<Scalars['Boolean']>;
  customName?: Maybe<Scalars['String']>;
};

export type Schedule = {
  __typename?: 'Schedule';
  mon?: Maybe<Instance>;
  tue?: Maybe<Instance>;
  wed?: Maybe<Instance>;
  thu?: Maybe<Instance>;
  fri?: Maybe<Instance>;
  sat?: Maybe<Instance>;
  sun?: Maybe<Instance>;
};

export type ScheduleInput = {
  mon?: Maybe<InstanceInput>;
  tue?: Maybe<InstanceInput>;
  wed?: Maybe<InstanceInput>;
  thu?: Maybe<InstanceInput>;
  fri?: Maybe<InstanceInput>;
  sat?: Maybe<InstanceInput>;
  sun?: Maybe<InstanceInput>;
};

export type Metric = {
  __typename?: 'Metric';
  name: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type MetricInput = {
  name: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type Record = {
  __typename?: 'Record';
  date: Scalars['String'];
  completed: Scalars['Boolean'];
  tracking?: Maybe<Array<Maybe<Metric>>>;
};

export type RecordInput = {
  date: Scalars['String'];
  completed: Scalars['Boolean'];
  tracking?: Maybe<Array<Maybe<MetricInput>>>;
};

export type Habit = {
  __typename?: 'Habit';
  _id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  schedule?: Maybe<Schedule>;
  history?: Maybe<Array<Maybe<Record>>>;
};

export type HabitInput = {
  name: Scalars['String'];
  schedule?: Maybe<ScheduleInput>;
  history?: Maybe<Array<Maybe<RecordInput>>>;
};

export type Query = {
  __typename?: 'Query';
  habits?: Maybe<Array<Maybe<Habit>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addHabit?: Maybe<Habit>;
  updateHabit?: Maybe<Habit>;
  deleteHabit?: Maybe<Scalars['Boolean']>;
};


export type MutationAddHabitArgs = {
  habit?: Maybe<HabitInput>;
};


export type MutationUpdateHabitArgs = {
  _id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};


export type MutationDeleteHabitArgs = {
  _id?: Maybe<Scalars['ID']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type AddHabitMutationVariables = Exact<{
  habit?: Maybe<HabitInput>;
}>;


export type AddHabitMutation = (
  { __typename?: 'Mutation' }
  & { addHabit?: Maybe<(
    { __typename?: 'Habit' }
    & Pick<Habit, '_id' | 'name'>
    & { schedule?: Maybe<(
      { __typename?: 'Schedule' }
      & { mon?: Maybe<(
        { __typename?: 'Instance' }
        & Pick<Instance, 'doesRepeat' | 'customName'>
      )>, tue?: Maybe<(
        { __typename?: 'Instance' }
        & Pick<Instance, 'doesRepeat' | 'customName'>
      )>, wed?: Maybe<(
        { __typename?: 'Instance' }
        & Pick<Instance, 'doesRepeat' | 'customName'>
      )>, thu?: Maybe<(
        { __typename?: 'Instance' }
        & Pick<Instance, 'doesRepeat' | 'customName'>
      )>, fri?: Maybe<(
        { __typename?: 'Instance' }
        & Pick<Instance, 'doesRepeat' | 'customName'>
      )>, sat?: Maybe<(
        { __typename?: 'Instance' }
        & Pick<Instance, 'doesRepeat' | 'customName'>
      )>, sun?: Maybe<(
        { __typename?: 'Instance' }
        & Pick<Instance, 'doesRepeat' | 'customName'>
      )> }
    )> }
  )> }
);

export type DeleteHabitMutationVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type DeleteHabitMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteHabit'>
);

export type GetHabitsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHabitsQuery = (
  { __typename?: 'Query' }
  & { habits?: Maybe<Array<Maybe<(
    { __typename?: 'Habit' }
    & Pick<Habit, '_id' | 'name'>
  )>>> }
);

export type UpdateHabitMutationVariables = Exact<{
  _id: Scalars['ID'];
  name: Scalars['String'];
}>;


export type UpdateHabitMutation = (
  { __typename?: 'Mutation' }
  & { updateHabit?: Maybe<(
    { __typename?: 'Habit' }
    & Pick<Habit, '_id' | 'name'>
  )> }
);


export const AddHabitDocument = gql`
    mutation AddHabit($habit: HabitInput) {
  addHabit(habit: $habit) {
    _id
    name
    schedule {
      mon {
        doesRepeat
        customName
      }
      tue {
        doesRepeat
        customName
      }
      wed {
        doesRepeat
        customName
      }
      thu {
        doesRepeat
        customName
      }
      fri {
        doesRepeat
        customName
      }
      sat {
        doesRepeat
        customName
      }
      sun {
        doesRepeat
        customName
      }
    }
  }
}
    `;
export type AddHabitMutationFn = Apollo.MutationFunction<AddHabitMutation, AddHabitMutationVariables>;

/**
 * __useAddHabitMutation__
 *
 * To run a mutation, you first call `useAddHabitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddHabitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addHabitMutation, { data, loading, error }] = useAddHabitMutation({
 *   variables: {
 *      habit: // value for 'habit'
 *   },
 * });
 */
export function useAddHabitMutation(baseOptions?: Apollo.MutationHookOptions<AddHabitMutation, AddHabitMutationVariables>) {
        return Apollo.useMutation<AddHabitMutation, AddHabitMutationVariables>(AddHabitDocument, baseOptions);
      }
export type AddHabitMutationHookResult = ReturnType<typeof useAddHabitMutation>;
export type AddHabitMutationResult = Apollo.MutationResult<AddHabitMutation>;
export type AddHabitMutationOptions = Apollo.BaseMutationOptions<AddHabitMutation, AddHabitMutationVariables>;
export const DeleteHabitDocument = gql`
    mutation DeleteHabit($_id: ID!) {
  deleteHabit(_id: $_id)
}
    `;
export type DeleteHabitMutationFn = Apollo.MutationFunction<DeleteHabitMutation, DeleteHabitMutationVariables>;

/**
 * __useDeleteHabitMutation__
 *
 * To run a mutation, you first call `useDeleteHabitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHabitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHabitMutation, { data, loading, error }] = useDeleteHabitMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useDeleteHabitMutation(baseOptions?: Apollo.MutationHookOptions<DeleteHabitMutation, DeleteHabitMutationVariables>) {
        return Apollo.useMutation<DeleteHabitMutation, DeleteHabitMutationVariables>(DeleteHabitDocument, baseOptions);
      }
export type DeleteHabitMutationHookResult = ReturnType<typeof useDeleteHabitMutation>;
export type DeleteHabitMutationResult = Apollo.MutationResult<DeleteHabitMutation>;
export type DeleteHabitMutationOptions = Apollo.BaseMutationOptions<DeleteHabitMutation, DeleteHabitMutationVariables>;
export const GetHabitsDocument = gql`
    query GetHabits {
  habits {
    _id
    name
  }
}
    `;

/**
 * __useGetHabitsQuery__
 *
 * To run a query within a React component, call `useGetHabitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHabitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHabitsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHabitsQuery(baseOptions?: Apollo.QueryHookOptions<GetHabitsQuery, GetHabitsQueryVariables>) {
        return Apollo.useQuery<GetHabitsQuery, GetHabitsQueryVariables>(GetHabitsDocument, baseOptions);
      }
export function useGetHabitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHabitsQuery, GetHabitsQueryVariables>) {
          return Apollo.useLazyQuery<GetHabitsQuery, GetHabitsQueryVariables>(GetHabitsDocument, baseOptions);
        }
export type GetHabitsQueryHookResult = ReturnType<typeof useGetHabitsQuery>;
export type GetHabitsLazyQueryHookResult = ReturnType<typeof useGetHabitsLazyQuery>;
export type GetHabitsQueryResult = Apollo.QueryResult<GetHabitsQuery, GetHabitsQueryVariables>;
export const UpdateHabitDocument = gql`
    mutation UpdateHabit($_id: ID!, $name: String!) {
  updateHabit(_id: $_id, name: $name) {
    _id
    name
  }
}
    `;
export type UpdateHabitMutationFn = Apollo.MutationFunction<UpdateHabitMutation, UpdateHabitMutationVariables>;

/**
 * __useUpdateHabitMutation__
 *
 * To run a mutation, you first call `useUpdateHabitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHabitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHabitMutation, { data, loading, error }] = useUpdateHabitMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateHabitMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHabitMutation, UpdateHabitMutationVariables>) {
        return Apollo.useMutation<UpdateHabitMutation, UpdateHabitMutationVariables>(UpdateHabitDocument, baseOptions);
      }
export type UpdateHabitMutationHookResult = ReturnType<typeof useUpdateHabitMutation>;
export type UpdateHabitMutationResult = Apollo.MutationResult<UpdateHabitMutation>;
export type UpdateHabitMutationOptions = Apollo.BaseMutationOptions<UpdateHabitMutation, UpdateHabitMutationVariables>;