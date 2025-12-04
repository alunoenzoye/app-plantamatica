<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CallRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\Validatio ffnRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => "required|string|max:255",
            "description" => "string|max:65535|nullable",
            "position" => "sometimes|nullable|array",
            "position.x" => "numeric:strict|min:0|required",
            "position.y" => "numeric:strict|min:0|required",
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Campo nome vazio',
        ];
    }
}
