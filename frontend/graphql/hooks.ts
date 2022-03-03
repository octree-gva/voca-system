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

export type ComponentConfigsBackupsConfigurations = {
  __typename?: 'ComponentConfigsBackupsConfigurations';
  id: Scalars['ID'];
  keep_n_daily?: Maybe<Scalars['Int']>;
  keep_n_weekly?: Maybe<Scalars['Int']>;
  keep_n_yearly?: Maybe<Scalars['Int']>;
};

export type ComponentConfigsBackupsConfigurationsInput = {
  id?: InputMaybe<Scalars['ID']>;
  keep_n_daily?: InputMaybe<Scalars['Int']>;
  keep_n_weekly?: InputMaybe<Scalars['Int']>;
  keep_n_yearly?: InputMaybe<Scalars['Int']>;
};

export type ComponentConfigsJelasticConfig = {
  __typename?: 'ComponentConfigsJelasticConfig';
  default_version?: Maybe<DecidimVersionEntityResponse>;
  id: Scalars['ID'];
  identifier?: Maybe<Scalars['String']>;
  password_enc?: Maybe<Scalars['String']>;
};

export type ComponentConfigsJelasticConfigInput = {
  default_version?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  identifier?: InputMaybe<Scalars['String']>;
  password_enc?: InputMaybe<Scalars['String']>;
};

export type ComponentConfigsS3Config = {
  __typename?: 'ComponentConfigsS3Config';
  api_key_enc?: Maybe<Scalars['String']>;
  api_sec_enc?: Maybe<Scalars['String']>;
  bucket?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  url?: Maybe<Scalars['String']>;
};

export type ComponentConfigsS3ConfigInput = {
  api_key_enc?: InputMaybe<Scalars['String']>;
  api_sec_enc?: InputMaybe<Scalars['String']>;
  bucket?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  url?: InputMaybe<Scalars['String']>;
};

export type Configuration = {
  __typename?: 'Configuration';
  Backups?: Maybe<ComponentConfigsBackupsConfigurations>;
  Jelastic?: Maybe<ComponentConfigsJelasticConfig>;
  S3?: Maybe<ComponentConfigsS3Config>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ConfigurationEntity = {
  __typename?: 'ConfigurationEntity';
  attributes?: Maybe<Configuration>;
  id?: Maybe<Scalars['ID']>;
};

export type ConfigurationEntityResponse = {
  __typename?: 'ConfigurationEntityResponse';
  data?: Maybe<ConfigurationEntity>;
};

export type ConfigurationInput = {
  Backups?: InputMaybe<ComponentConfigsBackupsConfigurationsInput>;
  Jelastic?: InputMaybe<ComponentConfigsJelasticConfigInput>;
  S3?: InputMaybe<ComponentConfigsS3ConfigInput>;
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

export type DecidimVersion = {
  __typename?: 'DecidimVersion';
  createdAt?: Maybe<Scalars['DateTime']>;
  image_url?: Maybe<Scalars['String']>;
  registery_url?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  version_number?: Maybe<Scalars['String']>;
};

export type DecidimVersionEntity = {
  __typename?: 'DecidimVersionEntity';
  attributes?: Maybe<DecidimVersion>;
  id?: Maybe<Scalars['ID']>;
};

export type DecidimVersionEntityResponse = {
  __typename?: 'DecidimVersionEntityResponse';
  data?: Maybe<DecidimVersionEntity>;
};

export type DecidimVersionEntityResponseCollection = {
  __typename?: 'DecidimVersionEntityResponseCollection';
  data: Array<DecidimVersionEntity>;
  meta: ResponseCollectionMeta;
};

export type DecidimVersionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<DecidimVersionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  image_url?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<DecidimVersionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DecidimVersionFiltersInput>>>;
  registery_url?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  version_number?: InputMaybe<StringFilterInput>;
};

export type DecidimVersionInput = {
  image_url?: InputMaybe<Scalars['String']>;
  registery_url?: InputMaybe<Scalars['String']>;
  version_number?: InputMaybe<Scalars['String']>;
};

export enum Enum_Organization_Subscription_Status {
  Current = 'current',
  Expired = 'expired',
  Pending = 'pending',
  Upcoming = 'upcoming'
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

export type GenericMorph = ComponentConfigsBackupsConfigurations | ComponentConfigsJelasticConfig | ComponentConfigsS3Config | Configuration | DecidimVersion | I18NLocale | Instance | Organization | OrganizationMember | OrganizationRole | StripeWebhookLog | UploadFile | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser;

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
  Name?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  ipv4?: Maybe<Scalars['String']>;
  organization?: Maybe<OrganizationEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  url?: Maybe<Scalars['String']>;
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
  Name?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<InstanceFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  ipv4?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<InstanceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<InstanceFiltersInput>>>;
  organization?: InputMaybe<OrganizationFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
};

export type InstanceInput = {
  Name?: InputMaybe<Scalars['String']>;
  ipv4?: InputMaybe<Scalars['String']>;
  organization?: InputMaybe<Scalars['ID']>;
  url?: InputMaybe<Scalars['String']>;
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

export type Mutation = {
  __typename?: 'Mutation';
  createDecidimVersion?: Maybe<DecidimVersionEntityResponse>;
  createInstance?: Maybe<InstanceEntityResponse>;
  createOrganization?: Maybe<OrganizationEntityResponse>;
  createOrganizationMember?: Maybe<OrganizationMemberEntityResponse>;
  createOrganizationRole?: Maybe<OrganizationRoleEntityResponse>;
  createStripeWebhookLog?: Maybe<StripeWebhookLogEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteConfiguration?: Maybe<ConfigurationEntityResponse>;
  deleteDecidimVersion?: Maybe<DecidimVersionEntityResponse>;
  deleteInstance?: Maybe<InstanceEntityResponse>;
  deleteOrganization?: Maybe<OrganizationEntityResponse>;
  deleteOrganizationMember?: Maybe<OrganizationMemberEntityResponse>;
  deleteOrganizationRole?: Maybe<OrganizationRoleEntityResponse>;
  deleteStripeWebhookLog?: Maybe<StripeWebhookLogEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Update an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateConfiguration?: Maybe<ConfigurationEntityResponse>;
  updateDecidimVersion?: Maybe<DecidimVersionEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateInstance?: Maybe<InstanceEntityResponse>;
  updateOrganization?: Maybe<OrganizationEntityResponse>;
  updateOrganizationMember?: Maybe<OrganizationMemberEntityResponse>;
  updateOrganizationRole?: Maybe<OrganizationRoleEntityResponse>;
  updateStripeWebhookLog?: Maybe<StripeWebhookLogEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
};


export type MutationCreateDecidimVersionArgs = {
  data: DecidimVersionInput;
};


export type MutationCreateInstanceArgs = {
  data: InstanceInput;
};


export type MutationCreateOrganizationArgs = {
  data: OrganizationInput;
};


export type MutationCreateOrganizationMemberArgs = {
  data: OrganizationMemberInput;
};


export type MutationCreateOrganizationRoleArgs = {
  data: OrganizationRoleInput;
};


export type MutationCreateStripeWebhookLogArgs = {
  data: StripeWebhookLogInput;
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


export type MutationDeleteDecidimVersionArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteInstanceArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteOrganizationArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteOrganizationMemberArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteOrganizationRoleArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteStripeWebhookLogArgs = {
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


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
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


export type MutationUpdateConfigurationArgs = {
  data: ConfigurationInput;
};


export type MutationUpdateDecidimVersionArgs = {
  data: DecidimVersionInput;
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


export type MutationUpdateOrganizationArgs = {
  data: OrganizationInput;
  id: Scalars['ID'];
};


export type MutationUpdateOrganizationMemberArgs = {
  data: OrganizationMemberInput;
  id: Scalars['ID'];
};


export type MutationUpdateOrganizationRoleArgs = {
  data: OrganizationRoleInput;
  id: Scalars['ID'];
};


export type MutationUpdateStripeWebhookLogArgs = {
  data: StripeWebhookLogInput;
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


export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};

export type Organization = {
  __typename?: 'Organization';
  createdAt?: Maybe<Scalars['DateTime']>;
  organization_members?: Maybe<OrganizationMemberRelationResponseCollection>;
  stripe_customer_id?: Maybe<Scalars['String']>;
  subscription_status?: Maybe<Enum_Organization_Subscription_Status>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type OrganizationOrganization_MembersArgs = {
  filters?: InputMaybe<OrganizationMemberFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type OrganizationEntity = {
  __typename?: 'OrganizationEntity';
  attributes?: Maybe<Organization>;
  id?: Maybe<Scalars['ID']>;
};

export type OrganizationEntityResponse = {
  __typename?: 'OrganizationEntityResponse';
  data?: Maybe<OrganizationEntity>;
};

export type OrganizationEntityResponseCollection = {
  __typename?: 'OrganizationEntityResponseCollection';
  data: Array<OrganizationEntity>;
  meta: ResponseCollectionMeta;
};

export type OrganizationFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<OrganizationFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<OrganizationFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<OrganizationFiltersInput>>>;
  organization_members?: InputMaybe<OrganizationMemberFiltersInput>;
  stripe_customer_id?: InputMaybe<StringFilterInput>;
  subscription_status?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type OrganizationInput = {
  organization_members?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  stripe_customer_id?: InputMaybe<Scalars['String']>;
  subscription_status?: InputMaybe<Enum_Organization_Subscription_Status>;
  title?: InputMaybe<Scalars['String']>;
};

export type OrganizationMember = {
  __typename?: 'OrganizationMember';
  createdAt?: Maybe<Scalars['DateTime']>;
  organization?: Maybe<OrganizationEntityResponse>;
  organization_roles?: Maybe<OrganizationRoleRelationResponseCollection>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users_permissions_user?: Maybe<UsersPermissionsUserEntityResponse>;
};


export type OrganizationMemberOrganization_RolesArgs = {
  filters?: InputMaybe<OrganizationRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type OrganizationMemberEntity = {
  __typename?: 'OrganizationMemberEntity';
  attributes?: Maybe<OrganizationMember>;
  id?: Maybe<Scalars['ID']>;
};

export type OrganizationMemberEntityResponse = {
  __typename?: 'OrganizationMemberEntityResponse';
  data?: Maybe<OrganizationMemberEntity>;
};

export type OrganizationMemberEntityResponseCollection = {
  __typename?: 'OrganizationMemberEntityResponseCollection';
  data: Array<OrganizationMemberEntity>;
  meta: ResponseCollectionMeta;
};

export type OrganizationMemberFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<OrganizationMemberFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<OrganizationMemberFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<OrganizationMemberFiltersInput>>>;
  organization?: InputMaybe<OrganizationFiltersInput>;
  organization_roles?: InputMaybe<OrganizationRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users_permissions_user?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type OrganizationMemberInput = {
  organization?: InputMaybe<Scalars['ID']>;
  organization_roles?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  users_permissions_user?: InputMaybe<Scalars['ID']>;
};

export type OrganizationMemberRelationResponseCollection = {
  __typename?: 'OrganizationMemberRelationResponseCollection';
  data: Array<OrganizationMemberEntity>;
};

export type OrganizationRole = {
  __typename?: 'OrganizationRole';
  can_add_user?: Maybe<Scalars['Boolean']>;
  can_create_instance?: Maybe<Scalars['Boolean']>;
  can_see_instance?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  help_text?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organization_member?: Maybe<OrganizationMemberEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OrganizationRoleEntity = {
  __typename?: 'OrganizationRoleEntity';
  attributes?: Maybe<OrganizationRole>;
  id?: Maybe<Scalars['ID']>;
};

export type OrganizationRoleEntityResponse = {
  __typename?: 'OrganizationRoleEntityResponse';
  data?: Maybe<OrganizationRoleEntity>;
};

export type OrganizationRoleEntityResponseCollection = {
  __typename?: 'OrganizationRoleEntityResponseCollection';
  data: Array<OrganizationRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type OrganizationRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<OrganizationRoleFiltersInput>>>;
  can_add_user?: InputMaybe<BooleanFilterInput>;
  can_create_instance?: InputMaybe<BooleanFilterInput>;
  can_see_instance?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  help_text?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<OrganizationRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<OrganizationRoleFiltersInput>>>;
  organization_member?: InputMaybe<OrganizationMemberFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type OrganizationRoleInput = {
  can_add_user?: InputMaybe<Scalars['Boolean']>;
  can_create_instance?: InputMaybe<Scalars['Boolean']>;
  can_see_instance?: InputMaybe<Scalars['Boolean']>;
  help_text?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  organization_member?: InputMaybe<Scalars['ID']>;
};

export type OrganizationRoleRelationResponseCollection = {
  __typename?: 'OrganizationRoleRelationResponseCollection';
  data: Array<OrganizationRoleEntity>;
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
  configuration?: Maybe<ConfigurationEntityResponse>;
  decidimVersion?: Maybe<DecidimVersionEntityResponse>;
  decidimVersions?: Maybe<DecidimVersionEntityResponseCollection>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  instance?: Maybe<InstanceEntityResponse>;
  instances?: Maybe<InstanceEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  organization?: Maybe<OrganizationEntityResponse>;
  organizationMember?: Maybe<OrganizationMemberEntityResponse>;
  organizationMembers?: Maybe<OrganizationMemberEntityResponseCollection>;
  organizationRole?: Maybe<OrganizationRoleEntityResponse>;
  organizationRoles?: Maybe<OrganizationRoleEntityResponseCollection>;
  organizations?: Maybe<OrganizationEntityResponseCollection>;
  stripeWebhookLog?: Maybe<StripeWebhookLogEntityResponse>;
  stripeWebhookLogs?: Maybe<StripeWebhookLogEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};


export type QueryDecidimVersionArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryDecidimVersionsArgs = {
  filters?: InputMaybe<DecidimVersionFiltersInput>;
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


export type QueryOrganizationArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryOrganizationMemberArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryOrganizationMembersArgs = {
  filters?: InputMaybe<OrganizationMemberFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryOrganizationRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryOrganizationRolesArgs = {
  filters?: InputMaybe<OrganizationRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryOrganizationsArgs = {
  filters?: InputMaybe<OrganizationFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryStripeWebhookLogArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryStripeWebhookLogsArgs = {
  filters?: InputMaybe<StripeWebhookLogFiltersInput>;
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

export type StripeWebhookLog = {
  __typename?: 'StripeWebhookLog';
  createdAt?: Maybe<Scalars['DateTime']>;
  parsed_at?: Maybe<Scalars['DateTime']>;
  payload?: Maybe<Scalars['JSON']>;
  received_at?: Maybe<Scalars['DateTime']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type StripeWebhookLogEntity = {
  __typename?: 'StripeWebhookLogEntity';
  attributes?: Maybe<StripeWebhookLog>;
  id?: Maybe<Scalars['ID']>;
};

export type StripeWebhookLogEntityResponse = {
  __typename?: 'StripeWebhookLogEntityResponse';
  data?: Maybe<StripeWebhookLogEntity>;
};

export type StripeWebhookLogEntityResponseCollection = {
  __typename?: 'StripeWebhookLogEntityResponseCollection';
  data: Array<StripeWebhookLogEntity>;
  meta: ResponseCollectionMeta;
};

export type StripeWebhookLogFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<StripeWebhookLogFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<StripeWebhookLogFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<StripeWebhookLogFiltersInput>>>;
  parsed_at?: InputMaybe<DateTimeFilterInput>;
  payload?: InputMaybe<JsonFilterInput>;
  received_at?: InputMaybe<DateTimeFilterInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type StripeWebhookLogInput = {
  parsed_at?: InputMaybe<Scalars['DateTime']>;
  payload?: InputMaybe<Scalars['JSON']>;
  received_at?: InputMaybe<Scalars['DateTime']>;
  type?: InputMaybe<Scalars['String']>;
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
  id: Scalars['ID'];
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
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  organization_members?: Maybe<OrganizationMemberRelationResponseCollection>;
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};


export type UsersPermissionsUserOrganization_MembersArgs = {
  filters?: InputMaybe<OrganizationMemberFiltersInput>;
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
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  organization_members?: InputMaybe<OrganizationMemberFiltersInput>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  confirmationToken?: InputMaybe<Scalars['String']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  organization_members?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
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

export type ConfigurationFieldsFragment = { __typename?: 'Configuration', Backups?: { __typename?: 'ComponentConfigsBackupsConfigurations', id: string, keep_n_weekly?: number | null } | null };

export type ConfigurationQueryVariables = Exact<{ [key: string]: never; }>;


export type ConfigurationQuery = { __typename?: 'Query', configuration?: { __typename?: 'ConfigurationEntityResponse', data?: { __typename?: 'ConfigurationEntity', id?: string | null, attributes?: { __typename?: 'Configuration', Backups?: { __typename?: 'ComponentConfigsBackupsConfigurations', id: string, keep_n_weekly?: number | null } | null } | null } | null } | null };

export const UserFieldsFragmentDoc = gql`
    fragment UserFields on UsersPermissionsMe {
  id
  username
  email
  confirmed
}
    `;
export const ConfigurationFieldsFragmentDoc = gql`
    fragment ConfigurationFields on Configuration {
  Backups {
    id
    keep_n_weekly
  }
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
export const ConfigurationDocument = gql`
    query Configuration {
  configuration {
    data {
      id
      attributes {
        ...ConfigurationFields
      }
    }
  }
}
    ${ConfigurationFieldsFragmentDoc}`;

/**
 * __useConfigurationQuery__
 *
 * To run a query within a React component, call `useConfigurationQuery` and pass it any options that fit your needs.
 * When your component renders, `useConfigurationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConfigurationQuery({
 *   variables: {
 *   },
 * });
 */
export function useConfigurationQuery(baseOptions?: Apollo.QueryHookOptions<ConfigurationQuery, ConfigurationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConfigurationQuery, ConfigurationQueryVariables>(ConfigurationDocument, options);
      }
export function useConfigurationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConfigurationQuery, ConfigurationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConfigurationQuery, ConfigurationQueryVariables>(ConfigurationDocument, options);
        }
export type ConfigurationQueryHookResult = ReturnType<typeof useConfigurationQuery>;
export type ConfigurationLazyQueryHookResult = ReturnType<typeof useConfigurationLazyQuery>;
export type ConfigurationQueryResult = Apollo.QueryResult<ConfigurationQuery, ConfigurationQueryVariables>;