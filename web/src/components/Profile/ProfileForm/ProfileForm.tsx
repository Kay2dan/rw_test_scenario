import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditProfileById, UpdateProfileInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'




type FormProfile = NonNullable<EditProfileById['profile']>

interface ProfileFormProps {
  profile?: EditProfileById['profile']
  onSave: (data: UpdateProfileInput, id?: FormProfile['id']) => void
  error: RWGqlError
  loading: boolean
}

const ProfileForm = (props: ProfileFormProps) => {
  const onSubmit = (data: FormProfile) => {




























    props.onSave(data, props?.profile?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormProfile> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="aboutMe"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          About me
        </Label>

        <TextField
          name="aboutMe"
          defaultValue={props.profile?.aboutMe}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />


        <FieldError name="aboutMe" className="rw-field-error" />

        <Label
          name="avatar"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Avatar
        </Label>

        <TextField
          name="avatar"
          defaultValue={props.profile?.avatar}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />


        <FieldError name="avatar" className="rw-field-error" />

        <Label
          name="missionStatement"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Mission statement
        </Label>

        <TextField
          name="missionStatement"
          defaultValue={props.profile?.missionStatement}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />


        <FieldError name="missionStatement" className="rw-field-error" />

        {/* <Label
          name="motivation"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Motivation
        </Label>
          <TextField
            name="motivation"
            defaultValue={props.profile?.motivation}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        <FieldError name="motivation" className="rw-field-error" /> */}

        {/* <Label
          name="gender"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Gender
        </Label>
          <TextField
            name="gender"
            defaultValue={props.profile?.gender}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        <FieldError name="gender" className="rw-field-error" /> */}

        <Label
          name="location"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Location
        </Label>

        <TextField
          name="location"
          defaultValue={props.profile?.location}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />


        <FieldError name="location" className="rw-field-error" />

        <Label
          name="timeZoneUTC"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Time zone utc
        </Label>

        <TextField
          name="timeZoneUTC"
          defaultValue={props.profile?.timeZoneUTC}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />


        <FieldError name="timeZoneUTC" className="rw-field-error" />

        <Label
          name="profession"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Profession
        </Label>

        <TextField
          name="profession"
          defaultValue={props.profile?.profession}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />


        <FieldError name="profession" className="rw-field-error" />

        {/* <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>
          <TextField
            name="userId"
            defaultValue={props.profile?.userId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        <FieldError name="userId" className="rw-field-error" /> */}

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ProfileForm
