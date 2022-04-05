import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Account = {
  __typename?: 'Account';
  administrators?: Maybe<UsersPermissionsUserRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<UsersPermissionsUserEntityResponse>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type AccountAdministratorsArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type AccountEntity = {
  __typename?: 'AccountEntity';
  attributes?: Maybe<Account>;
  id?: Maybe<Scalars['ID']>;
};

export type AccountEntityResponse = {
  __typename?: 'AccountEntityResponse';
  data?: Maybe<AccountEntity>;
};

export type AccountEntityResponseCollection = {
  __typename?: 'AccountEntityResponseCollection';
  data: Array<AccountEntity>;
  meta: ResponseCollectionMeta;
};

export type AccountFiltersInput = {
  administrators?: InputMaybe<UsersPermissionsUserFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<AccountFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  creator?: InputMaybe<UsersPermissionsUserFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<AccountFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<AccountFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AccountInput = {
  administrators?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  creator?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type AccountRelationResponseCollection = {
  __typename?: 'AccountRelationResponseCollection';
  data: Array<AccountEntity>;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  contains?: InputMaybe<Scalars['Boolean']>;
  containsi?: InputMaybe<Scalars['Boolean']>;
  endsWith?: InputMaybe<Scalars['Boolean']>;
  eq?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Boolean']>;
  gte?: InputMaybe<Scalars['Boolean']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  lt?: InputMaybe<Scalars['Boolean']>;
  lte?: InputMaybe<Scalars['Boolean']>;
  ne?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']>;
  notContainsi?: InputMaybe<Scalars['Boolean']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  contains?: InputMaybe<Scalars['DateTime']>;
  containsi?: InputMaybe<Scalars['DateTime']>;
  endsWith?: InputMaybe<Scalars['DateTime']>;
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  ne?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']>;
  notContainsi?: InputMaybe<Scalars['DateTime']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']>;
};

export enum Enum_Instance_Status {
  Pending = 'pending',
  Started = 'started',
  Stopped = 'stopped'
}

export enum Enum_Notification_Level {
  Error = 'error',
  Info = 'info',
  Warn = 'warn'
}

export enum Enum_Webhook_Status {
  Completed = 'completed',
  Waiting = 'waiting'
}

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  contains?: InputMaybe<Scalars['Float']>;
  containsi?: InputMaybe<Scalars['Float']>;
  endsWith?: InputMaybe<Scalars['Float']>;
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']>;
  notContainsi?: InputMaybe<Scalars['Float']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  startsWith?: InputMaybe<Scalars['Float']>;
};

export type GenericMorph = Account | I18NLocale | Instance | JelasticConfig | Notification | UploadFile | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser | Webhook;

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars['ID']>;
};

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse';
  data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contains?: InputMaybe<Scalars['ID']>;
  containsi?: InputMaybe<Scalars['ID']>;
  endsWith?: InputMaybe<Scalars['ID']>;
  eq?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  gte?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  lt?: InputMaybe<Scalars['ID']>;
  lte?: InputMaybe<Scalars['ID']>;
  ne?: InputMaybe<Scalars['ID']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']>;
  notContainsi?: InputMaybe<Scalars['ID']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  startsWith?: InputMaybe<Scalars['ID']>;
};

export type Instance = {
  __typename?: 'Instance';
  account?: Maybe<AccountEntityResponse>;
  acronym?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  creator?: Maybe<UsersPermissionsUserEntityResponse>;
  envName?: Maybe<Scalars['String']>;
  instanceUUID?: Maybe<Scalars['String']>;
  notifications?: Maybe<NotificationRelationResponseCollection>;
  status?: Maybe<Enum_Instance_Status>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  webhooks?: Maybe<WebhookRelationResponseCollection>;
};


export type InstanceNotificationsArgs = {
  filters?: InputMaybe<NotificationFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type InstanceWebhooksArgs = {
  filters?: InputMaybe<WebhookFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type InstanceEntity = {
  __typename?: 'InstanceEntity';
  attributes?: Maybe<Instance>;
  id?: Maybe<Scalars['ID']>;
};

export type InstanceEntityResponse = {
  __typename?: 'InstanceEntityResponse';
  data?: Maybe<InstanceEntity>;
};

export type InstanceEntityResponseCollection = {
  __typename?: 'InstanceEntityResponseCollection';
  data: Array<InstanceEntity>;
  meta: ResponseCollectionMeta;
};

export type InstanceFiltersInput = {
  account?: InputMaybe<AccountFiltersInput>;
  acronym?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<InstanceFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  creator?: InputMaybe<UsersPermissionsUserFiltersInput>;
  envName?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  instanceUUID?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<InstanceFiltersInput>;
  notifications?: InputMaybe<NotificationFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<InstanceFiltersInput>>>;
  status?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  webhooks?: InputMaybe<WebhookFiltersInput>;
};

export type InstanceInput = {
  account?: InputMaybe<Scalars['ID']>;
  acronym?: InputMaybe<Scalars['String']>;
  creator?: InputMaybe<Scalars['ID']>;
  envName?: InputMaybe<Scalars['String']>;
  instanceUUID?: InputMaybe<Scalars['String']>;
  notifications?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  status?: InputMaybe<Enum_Instance_Status>;
  title?: InputMaybe<Scalars['String']>;
  webhooks?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type InstanceInstallInput = {
  acronym: Scalars['String'];
  subdomain: Scalars['String'];
  title: Scalars['String'];
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  contains?: InputMaybe<Scalars['Int']>;
  containsi?: InputMaybe<Scalars['Int']>;
  endsWith?: InputMaybe<Scalars['Int']>;
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']>;
  notContainsi?: InputMaybe<Scalars['Int']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  startsWith?: InputMaybe<Scalars['Int']>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  contains?: InputMaybe<Scalars['JSON']>;
  containsi?: InputMaybe<Scalars['JSON']>;
  endsWith?: InputMaybe<Scalars['JSON']>;
  eq?: InputMaybe<Scalars['JSON']>;
  gt?: InputMaybe<Scalars['JSON']>;
  gte?: InputMaybe<Scalars['JSON']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  lt?: InputMaybe<Scalars['JSON']>;
  lte?: InputMaybe<Scalars['JSON']>;
  ne?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']>;
  notContainsi?: InputMaybe<Scalars['JSON']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  startsWith?: InputMaybe<Scalars['JSON']>;
};

export type JelasticConfig = {
  __typename?: 'JelasticConfig';
  createdAt?: Maybe<Scalars['DateTime']>;
  decidimTimezone?: Maybe<Scalars['String']>;
  defaultFromEmail?: Maybe<Scalars['String']>;
  defaultSystemPassword?: Maybe<Scalars['String']>;
  jelasticHost?: Maybe<Scalars['String']>;
  jelasticInstancePrefix?: Maybe<Scalars['String']>;
  jelasticToken?: Maybe<Scalars['String']>;
  jobImagePath?: Maybe<Scalars['String']>;
  jobImageRegistry?: Maybe<Scalars['String']>;
  manifestUrl?: Maybe<Scalars['String']>;
  nodeGroup?: Maybe<Scalars['String']>;
  prodImagePath?: Maybe<Scalars['String']>;
  prodImageRegistry?: Maybe<Scalars['String']>;
  registeryPassword?: Maybe<Scalars['String']>;
  registeryUsername?: Maybe<Scalars['String']>;
  smtpAuthentication?: Maybe<Scalars['String']>;
  smtpHost?: Maybe<Scalars['String']>;
  smtpOpenTimeout?: Maybe<Scalars['String']>;
  smtpPassword?: Maybe<Scalars['String']>;
  smtpPort?: Maybe<Scalars['String']>;
  smtpReadTimeout?: Maybe<Scalars['String']>;
  smtpUsername?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  webhookHMAC?: Maybe<Scalars['String']>;
  webhookPassword?: Maybe<Scalars['String']>;
  webhookUrl?: Maybe<Scalars['String']>;
  webhookUsername?: Maybe<Scalars['String']>;
};

export type JelasticConfigEntity = {
  __typename?: 'JelasticConfigEntity';
  attributes?: Maybe<JelasticConfig>;
  id?: Maybe<Scalars['ID']>;
};

export type JelasticConfigEntityResponse = {
  __typename?: 'JelasticConfigEntityResponse';
  data?: Maybe<JelasticConfigEntity>;
};

export type JelasticConfigInput = {
  decidimTimezone?: InputMaybe<Scalars['String']>;
  defaultFromEmail?: InputMaybe<Scalars['String']>;
  defaultSystemPassword?: InputMaybe<Scalars['String']>;
  jelasticHost?: InputMaybe<Scalars['String']>;
  jelasticInstancePrefix?: InputMaybe<Scalars['String']>;
  jelasticToken?: InputMaybe<Scalars['String']>;
  jobImagePath?: InputMaybe<Scalars['String']>;
  jobImageRegistry?: InputMaybe<Scalars['String']>;
  manifestUrl?: InputMaybe<Scalars['String']>;
  nodeGroup?: InputMaybe<Scalars['String']>;
  prodImagePath?: InputMaybe<Scalars['String']>;
  prodImageRegistry?: InputMaybe<Scalars['String']>;
  registeryPassword?: InputMaybe<Scalars['String']>;
  registeryUsername?: InputMaybe<Scalars['String']>;
  smtpAuthentication?: InputMaybe<Scalars['String']>;
  smtpHost?: InputMaybe<Scalars['String']>;
  smtpOpenTimeout?: InputMaybe<Scalars['String']>;
  smtpPassword?: InputMaybe<Scalars['String']>;
  smtpPort?: InputMaybe<Scalars['String']>;
  smtpReadTimeout?: InputMaybe<Scalars['String']>;
  smtpUsername?: InputMaybe<Scalars['String']>;
  webhookHMAC?: InputMaybe<Scalars['String']>;
  webhookPassword?: InputMaybe<Scalars['String']>;
  webhookUrl?: InputMaybe<Scalars['String']>;
  webhookUsername?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount?: Maybe<AccountEntityResponse>;
  createInstance?: Maybe<InstanceEntityResponse>;
  createNotification?: Maybe<NotificationEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  createWebhook?: Maybe<WebhookEntityResponse>;
  deleteAccount?: Maybe<AccountEntityResponse>;
  deleteInstance?: Maybe<InstanceEntityResponse>;
  deleteJelasticConfig?: Maybe<JelasticConfigEntityResponse>;
  deleteNotification?: Maybe<NotificationEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Update an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteWebhook?: Maybe<WebhookEntityResponse>;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Create user account and install first instance */
  firstInstall?: Maybe<OkayResponse>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateAccount?: Maybe<AccountEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateInstance?: Maybe<InstanceEntityResponse>;
  updateJelasticConfig?: Maybe<JelasticConfigEntityResponse>;
  updateNotification?: Maybe<NotificationEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  updateWebhook?: Maybe<WebhookEntityResponse>;
  upload: UploadFileEntityResponse;
};


export type MutationCreateAccountArgs = {
  data: AccountInput;
};


export type MutationCreateInstanceArgs = {
  data: InstanceInput;
};


export type MutationCreateNotificationArgs = {
  data: NotificationInput;
};


export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationCreateWebhookArgs = {
  data: WebhookInput;
};


export type MutationDeleteAccountArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteInstanceArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteNotificationArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteWebhookArgs = {
  id: Scalars['ID'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};


export type MutationFirstInstallArgs = {
  instance: InstanceInstallInput;
  user: UserInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  files: Array<InputMaybe<Scalars['Upload']>>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID'];
};


export type MutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationUpdateAccountArgs = {
  data: AccountInput;
  id: Scalars['ID'];
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info?: InputMaybe<FileInfoInput>;
};


export type MutationUpdateInstanceArgs = {
  data: InstanceInput;
  id: Scalars['ID'];
};


export type MutationUpdateJelasticConfigArgs = {
  data: JelasticConfigInput;
};


export type MutationUpdateNotificationArgs = {
  data: NotificationInput;
  id: Scalars['ID'];
};


export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID'];
};


export type MutationUpdateWebhookArgs = {
  data: WebhookInput;
  id: Scalars['ID'];
};


export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};

export type Notification = {
  __typename?: 'Notification';
  content?: Maybe<Scalars['JSON']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  instance?: Maybe<InstanceEntityResponse>;
  level?: Maybe<Enum_Notification_Level>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type NotificationEntity = {
  __typename?: 'NotificationEntity';
  attributes?: Maybe<Notification>;
  id?: Maybe<Scalars['ID']>;
};

export type NotificationEntityResponse = {
  __typename?: 'NotificationEntityResponse';
  data?: Maybe<NotificationEntity>;
};

export type NotificationEntityResponseCollection = {
  __typename?: 'NotificationEntityResponseCollection';
  data: Array<NotificationEntity>;
  meta: ResponseCollectionMeta;
};

export type NotificationFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<NotificationFiltersInput>>>;
  content?: InputMaybe<JsonFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  instance?: InputMaybe<InstanceFiltersInput>;
  level?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<NotificationFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<NotificationFiltersInput>>>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type NotificationInput = {
  content?: InputMaybe<Scalars['JSON']>;
  instance?: InputMaybe<Scalars['ID']>;
  level?: InputMaybe<Enum_Notification_Level>;
  type?: InputMaybe<Scalars['String']>;
};

export type NotificationRelationResponseCollection = {
  __typename?: 'NotificationRelationResponseCollection';
  data: Array<NotificationEntity>;
};

export type OkayResponse = {
  __typename?: 'OkayResponse';
  errCode?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int'];
  pageCount: Scalars['Int'];
  pageSize: Scalars['Int'];
  total: Scalars['Int'];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<AccountEntityResponse>;
  accounts?: Maybe<AccountEntityResponseCollection>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  instance?: Maybe<InstanceEntityResponse>;
  instances?: Maybe<InstanceEntityResponseCollection>;
  jelasticConfig?: Maybe<JelasticConfigEntityResponse>;
  me?: Maybe<UsersPermissionsMe>;
  notification?: Maybe<NotificationEntityResponse>;
  notifications?: Maybe<NotificationEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
  webhook?: Maybe<WebhookEntityResponse>;
  webhooks?: Maybe<WebhookEntityResponseCollection>;
};


export type QueryAccountArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryAccountsArgs = {
  filters?: InputMaybe<AccountFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryInstanceArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryInstancesArgs = {
  filters?: InputMaybe<InstanceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryNotificationArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryNotificationsArgs = {
  filters?: InputMaybe<NotificationFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryWebhookArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryWebhooksArgs = {
  filters?: InputMaybe<WebhookFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contains?: InputMaybe<Scalars['String']>;
  containsi?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']>;
  notContainsi?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars['ID']>;
};

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse';
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  ext?: InputMaybe<Scalars['String']>;
  formats?: InputMaybe<Scalars['JSON']>;
  hash?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  mime?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  previewUrl?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  provider_metadata?: InputMaybe<Scalars['JSON']>;
  size?: InputMaybe<Scalars['Float']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  password_confirmation: Scalars['String'];
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: Scalars['String'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse';
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  administrator_accounts?: Maybe<AccountRelationResponseCollection>;
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};


export type UsersPermissionsUserAdministrator_AccountsArgs = {
  filters?: InputMaybe<AccountFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  administrator_accounts?: InputMaybe<AccountFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  firstName?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  lastName?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  administrator_accounts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  blocked?: InputMaybe<Scalars['Boolean']>;
  confirmationToken?: InputMaybe<Scalars['String']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  resetPasswordToken?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['ID']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type Webhook = {
  __typename?: 'Webhook';
  content?: Maybe<Scalars['JSON']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  eventType?: Maybe<Scalars['String']>;
  instance?: Maybe<InstanceEntityResponse>;
  status?: Maybe<Enum_Webhook_Status>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type WebhookEntity = {
  __typename?: 'WebhookEntity';
  attributes?: Maybe<Webhook>;
  id?: Maybe<Scalars['ID']>;
};

export type WebhookEntityResponse = {
  __typename?: 'WebhookEntityResponse';
  data?: Maybe<WebhookEntity>;
};

export type WebhookEntityResponseCollection = {
  __typename?: 'WebhookEntityResponseCollection';
  data: Array<WebhookEntity>;
  meta: ResponseCollectionMeta;
};

export type WebhookFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<WebhookFiltersInput>>>;
  content?: InputMaybe<JsonFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  eventType?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  instance?: InputMaybe<InstanceFiltersInput>;
  not?: InputMaybe<WebhookFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<WebhookFiltersInput>>>;
  status?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type WebhookInput = {
  content?: InputMaybe<Scalars['JSON']>;
  eventType?: InputMaybe<Scalars['String']>;
  instance?: InputMaybe<Scalars['ID']>;
  status?: InputMaybe<Enum_Webhook_Status>;
};

export type WebhookRelationResponseCollection = {
  __typename?: 'WebhookRelationResponseCollection';
  data: Array<WebhookEntity>;
};

export type UserFieldsFragment = { __typename?: 'UsersPermissionsMe', id: string, username: string, email?: string | null, confirmed?: boolean | null };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UsersPermissionsLoginPayload', user: { __typename?: 'UsersPermissionsMe', id: string, username: string, email?: string | null, confirmed?: boolean | null } } };

export type LoginMutationVariables = Exact<{
  identifier: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UsersPermissionsLoginPayload', jwt?: string | null, user: { __typename?: 'UsersPermissionsMe', id: string, username: string, email?: string | null, confirmed?: boolean | null } } };

export type ForgotMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotMutation = { __typename?: 'Mutation', forgotPassword?: { __typename?: 'UsersPermissionsPasswordPayload', ok: boolean } | null };

export type ResetMutationVariables = Exact<{
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
  code: Scalars['String'];
}>;


export type ResetMutation = { __typename?: 'Mutation', resetPassword?: { __typename?: 'UsersPermissionsLoginPayload', jwt?: string | null, user: { __typename?: 'UsersPermissionsMe', confirmed?: boolean | null } } | null };

export type FirstInstallMutationVariables = Exact<{
  user: UserInput;
  instance: InstanceInstallInput;
}>;


export type FirstInstallMutation = { __typename?: 'Mutation', firstInstall?: { __typename?: 'OkayResponse', ok: boolean, errCode?: string | null } | null };

export type InstancesQueryVariables = Exact<{ [key: string]: never; }>;


export type InstancesQuery = { __typename?: 'Query', instances?: { __typename?: 'InstanceEntityResponseCollection', data: Array<{ __typename?: 'InstanceEntity', id?: string | null, attributes?: { __typename?: 'Instance', title?: string | null, envName?: string | null, status?: Enum_Instance_Status | null } | null }> } | null };

export type ProfileFieldsFragment = { __typename?: 'UsersPermissionsMe', id: string, username: string, email?: string | null, lastName?: string | null, firstName?: string | null };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', me?: { __typename?: 'UsersPermissionsMe', id: string, username: string, email?: string | null, lastName?: string | null, firstName?: string | null } | null };

export type UpdateUserMutationVariables = Exact<{
  userUpdate: UsersPermissionsUserInput;
  id: Scalars['ID'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUsersPermissionsUser: { __typename?: 'UsersPermissionsUserEntityResponse', data?: { __typename?: 'UsersPermissionsUserEntity', attributes?: { __typename?: 'UsersPermissionsUser', username: string, email: string, lastName?: string | null, firstName?: string | null } | null } | null } };

export const UserFieldsFragmentDoc = gql`
    fragment UserFields on UsersPermissionsMe {
  id
  username
  email
  confirmed
}
    `;
export const ProfileFieldsFragmentDoc = gql`
    fragment ProfileFields on UsersPermissionsMe {
  id
  username
  email
  lastName
  firstName
}
    `;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(input: {username: $username, email: $email, password: $password}) {
    user {
      ...UserFields
    }
  }
}
    ${UserFieldsFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($identifier: String!, $password: String!) {
  login(input: {identifier: $identifier, password: $password}) {
    jwt
    user {
      ...UserFields
    }
  }
}
    ${UserFieldsFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      identifier: // value for 'identifier'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ForgotDocument = gql`
    mutation Forgot($email: String!) {
  forgotPassword(email: $email) {
    ok
  }
}
    `;
export type ForgotMutationFn = Apollo.MutationFunction<ForgotMutation, ForgotMutationVariables>;

/**
 * __useForgotMutation__
 *
 * To run a mutation, you first call `useForgotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotMutation, { data, loading, error }] = useForgotMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotMutation(baseOptions?: Apollo.MutationHookOptions<ForgotMutation, ForgotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotMutation, ForgotMutationVariables>(ForgotDocument, options);
      }
export type ForgotMutationHookResult = ReturnType<typeof useForgotMutation>;
export type ForgotMutationResult = Apollo.MutationResult<ForgotMutation>;
export type ForgotMutationOptions = Apollo.BaseMutationOptions<ForgotMutation, ForgotMutationVariables>;
export const ResetDocument = gql`
    mutation Reset($password: String!, $passwordConfirmation: String!, $code: String!) {
  resetPassword(
    password: $password
    passwordConfirmation: $passwordConfirmation
    code: $code
  ) {
    user {
      confirmed
    }
    jwt
  }
}
    `;
export type ResetMutationFn = Apollo.MutationFunction<ResetMutation, ResetMutationVariables>;

/**
 * __useResetMutation__
 *
 * To run a mutation, you first call `useResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetMutation, { data, loading, error }] = useResetMutation({
 *   variables: {
 *      password: // value for 'password'
 *      passwordConfirmation: // value for 'passwordConfirmation'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useResetMutation(baseOptions?: Apollo.MutationHookOptions<ResetMutation, ResetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetMutation, ResetMutationVariables>(ResetDocument, options);
      }
export type ResetMutationHookResult = ReturnType<typeof useResetMutation>;
export type ResetMutationResult = Apollo.MutationResult<ResetMutation>;
export type ResetMutationOptions = Apollo.BaseMutationOptions<ResetMutation, ResetMutationVariables>;
export const FirstInstallDocument = gql`
    mutation firstInstall($user: UserInput!, $instance: InstanceInstallInput!) {
  firstInstall(user: $user, instance: $instance) {
    ok
    errCode
  }
}
    `;
export type FirstInstallMutationFn = Apollo.MutationFunction<FirstInstallMutation, FirstInstallMutationVariables>;

/**
 * __useFirstInstallMutation__
 *
 * To run a mutation, you first call `useFirstInstallMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFirstInstallMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [firstInstallMutation, { data, loading, error }] = useFirstInstallMutation({
 *   variables: {
 *      user: // value for 'user'
 *      instance: // value for 'instance'
 *   },
 * });
 */
export function useFirstInstallMutation(baseOptions?: Apollo.MutationHookOptions<FirstInstallMutation, FirstInstallMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FirstInstallMutation, FirstInstallMutationVariables>(FirstInstallDocument, options);
      }
export type FirstInstallMutationHookResult = ReturnType<typeof useFirstInstallMutation>;
export type FirstInstallMutationResult = Apollo.MutationResult<FirstInstallMutation>;
export type FirstInstallMutationOptions = Apollo.BaseMutationOptions<FirstInstallMutation, FirstInstallMutationVariables>;
export const InstancesDocument = gql`
    query Instances {
  instances {
    data {
      id
      attributes {
        title
        envName
        status
      }
    }
  }
}
    `;

/**
 * __useInstancesQuery__
 *
 * To run a query within a React component, call `useInstancesQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstancesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstancesQuery({
 *   variables: {
 *   },
 * });
 */
export function useInstancesQuery(baseOptions?: Apollo.QueryHookOptions<InstancesQuery, InstancesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InstancesQuery, InstancesQueryVariables>(InstancesDocument, options);
      }
export function useInstancesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InstancesQuery, InstancesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InstancesQuery, InstancesQueryVariables>(InstancesDocument, options);
        }
export type InstancesQueryHookResult = ReturnType<typeof useInstancesQuery>;
export type InstancesLazyQueryHookResult = ReturnType<typeof useInstancesLazyQuery>;
export type InstancesQueryResult = Apollo.QueryResult<InstancesQuery, InstancesQueryVariables>;
export const ProfileDocument = gql`
    query profile {
  me {
    ...ProfileFields
  }
}
    ${ProfileFieldsFragmentDoc}`;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($userUpdate: UsersPermissionsUserInput!, $id: ID!) {
  updateUsersPermissionsUser(id: $id, data: $userUpdate) {
    data {
      attributes {
        username
        email
        lastName
        firstName
      }
    }
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      userUpdate: // value for 'userUpdate'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;