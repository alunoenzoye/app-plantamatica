<?php

namespace App\Http\Requests\app;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => "required|string|max:255",
            "priority" => "required|in:low,medium,high",
            "due_date" => "date",
            "description" => "string|max:65535|nullable"
            //
        ];
    }

    public function messages() {
        return [
            'name.required' => 'Campo nome vazio',
            'priority.required' => 'Campo prioridade vazio',
        ];
    }
}
