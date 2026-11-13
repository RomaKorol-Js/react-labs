// import { useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import GuestsStepper from './GuestsStepper.jsx'
import { startTransition, useActionState } from 'react'
import { sendBooking } from '../api.js'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookingSchema } from '../bookingSchema.js'

export default function BookingForm() {
  const defaultValues = {
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    comment: '',
  }

  // const [comment, setComment] = useState('')
  // const [guests, setGuests] = useState(2)
  // const nameRef = useRef(null)
  const {
    register,
    control,
    handleSubmit,
    reset,
    setFocus,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues,
    mode: 'onTouched',
  })

  const [result, dispatch, isPending] = useActionState(bookTable, null)

  // Дія для useActionState: null — сигнал «Очистити»; інакше надсилаємо
  // бронювання, після успіху очищаємо форму й повертаємо відповідь.
  async function bookTable(previousResult, booking) {
    if (booking === null) return null
    const response = await sendBooking(booking)
    if (response.ok) startTransition(() => reset())
    return response
  }

  const comment = useWatch({ control, name: 'comment' })
  function onValid(data) {
    if (isPending) return
    startTransition(() => dispatch(data))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.currentTarget.requestSubmit()
    }
  }

  function handleReset() {
    setFocus('name') // до reset(): він прибирає посилання на поля
    reset()
    startTransition(() => dispatch(null))
  }

  return (
    <form
      className="booking-form"
      noValidate
      onSubmit={handleSubmit(onValid)}
      onKeyDown={handleKeyDown}
    >
      <div className="field">
        <label>
          Ім'я
          <input
            {...register('name')}
            autoComplete="name"
            required
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby="name-error"
          />
        </label>
        <p id="name-error" className="field-error">
          {errors.name?.message}
        </p>
      </div>
      <div className="field">
        <label>
          Телефон
          <input
            {...register('phone')}
            type="tel"
            name="phone"
            autoComplete="tel"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby="phone-error"
            placeholder="+380671234567"
            required
          />
        </label>
        <p id="phone-error" className="field-error">
          {errors.tel?.message}
        </p>
      </div>
      <div className="row">
        <div className="field">
          <label>
            Дата
            <input
              {...register('date', {
                onChange: () => {
                  if (getValues('time')) trigger('time')
                },
              })}
              type="date"
              name="date"
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby="date-error"
              required
            />
          </label>
          <p id="date-error" className="field-error">
            {errors.date?.message}
          </p>
        </div>
        <div className="field">
          <label>
            Час
            <input
              {...register('time')}
              type="time"
              name="time"
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby="time-error"
              required
            />
          </label>
          <p id="time-error" className="field-error">
            {errors.time?.message}
          </p>
        </div>
      </div>
      <Controller
        name="guests"
        control={control}
        render={({ field }) => (
          <GuestsStepper value={field.value} onChange={field.onChange} />
        )}
      />
      <label>
        Коментар
        <textarea
          {...register('comment')}
          maxLength={200}
          aria-describedby="comment-counter"
        />
      </label>
      <p id="comment-counter" className="counter">
        {comment.length} / 200
      </p>
      <div className="actions">
        <button type="submit" aria-disabled={isPending}>
          {isPending ? 'Надсилаємо…' : 'Забронювати'}
        </button>
        <button type="button" onClick={handleReset}>
          Очистити
        </button>
      </div>
      <p
        role="status"
        className={result?.ok === false ? 'status error' : 'status'}
      >
        {result?.message}
      </p>
    </form>
  )
}
